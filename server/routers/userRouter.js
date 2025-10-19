const express = require("express");
const router = express.Router();
const Contact = require("../models/ContactForm"); // messageModel is your InternshipSchema
const { protectUserRoute } = require('../middleware/authMiddleware');

const jwt = require('jsonwebtoken');

const User = require("../models/userModel");
const Permission = require("../models/PermissionModal")


const Blog = require('../models/Blogschema');


const upload = require('../config/multer');

const DeveloperGrant = require('../models/DevGrantModal')

// ================================================================
// User Authentication Part Come here
// ================================================================

// Route : Post /api/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Match password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        console.log('JWT Secret:', process.env.JWT_SECRET_USER);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_USER, {
            expiresIn: '6d',
        });

        res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// User registration route
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the User already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new User (password will be hashed automatically via pre('save') middleware)
        const newUser = new User({
            email,
            password  // Save password as plain text, hashing will occur in the pre-save hook
        });

        // Save the new User to the database
        await newUser.save();

        // Generate JWT token for the newly registered User
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_USER, {
            expiresIn: '6d',
        });

        res.status(201).json({ token, message: `${email} registered successfully` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




// ================================================================
// Operation User Can Perform Authentication
// ================================================================





// GET /user/info — protected user info with permission
router.get('/info', protectUserRoute, async (req, res) => {
    try {
        const user = req.user;

        const allowedPermission = await Permission.findOne({ _id: user.permission });


        res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                email: user.email,
                permission: allowedPermission || {} // populated from Permission model
            }
        });
    } catch (err) {
        console.error('Error fetching user info:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});






// POST /user/blog - submit a blog
router.post('/blog', protectUserRoute, upload.single('coverImage'), async (req, res) => {
    try {
        const user = req.user;


        const allowedPermssion = await Permission.findOne({ _id: user.permission })
        // ✅ Permission check
        if (!allowedPermssion.permissions?.postBlog) {
            return res.status(403).json({ success: false, message: 'You are not allowed to post a blog.' });
        }

        const { title, category, content, publicationDate } = req.body;

        if (!title || !category || !content || !publicationDate) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        const blog = new Blog({
            title,
            category,
            content,
            publicationDate,
            coverImageUrl: req.file ? req.file.path : null,
            author: user._id
        });

        const savedBlog = await blog.save();

        res.status(201).json({
            success: true,
            message: 'Blog posted successfully!',
            blog: savedBlog
        });
    } catch (error) {
        console.error('Error uploading blog:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});



router.get("/view-message", protectUserRoute, async (req, res) => {
    try {
        const allMessages = await Contact.find({});

        res.status(200).json({
            success: true,
            message: "Messages fetched successfully",
            data: allMessages
        });

        console.log("All contact messages fetched successfully.");
    } catch (error) {
        console.error("Error fetching contact messages:", error);
        res.status(500).json({ success: false, message: "Something went wrong!" });
    }
});



router.get("/view-applicant", protectUserRoute, async (req, res) => {
    try {
        const ViewApplicant = await DeveloperGrant.find({});

        res.status(200).json({
            success: true,
            message: "Messages fetched successfully",
            data: ViewApplicant
        });

        console.log("All contact messages fetched successfully.");
    } catch (error) {
        console.error("Error fetching contact messages:", error);
        res.status(500).json({ success: false, message: "Something went wrong!" });
    }
});





// =================================================
// UnAuthorized User Activities
// =================================================


// Route: POST /api/user/contact
router.post("/contact", async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Basic validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Save to DB
        const newMessage = new Contact({
            name,
            email,
            subject,
            message,
        });

        const savedMessage = await newMessage.save();

        res.status(201).json({
            success: true,
            message: "Message sent successfully!",
            data: savedMessage,
        });

        console.log("Contact message saved successfully:", savedMessage);
    } catch (error) {
        console.error("Error saving contact message:", error);
        res.status(500).json({ success: false, message: "Something went wrong!" });
    }
});


// POST /apply - Developer applies for grant
router.post('/apply', async (req, res) => {
    try {
        const { fullName, email, githubProfile, projectIdea, skills, experienceLevel } = req.body;

        if (!fullName || !email || !githubProfile || !projectIdea || !experienceLevel) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        const newApplication = new DeveloperGrant({
            fullName,
            email,
            githubProfile,
            projectIdea,
            skills,
            experienceLevel
        });

        await newApplication.save();
        res.status(201).json({ success: true, message: 'Application submitted successfully.' });
    } catch (error) {
        console.error('Developer Grant Error:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

module.exports = router;
