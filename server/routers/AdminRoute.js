const express = require("express");
const router = express.Router();
const Admin = require("../models/AdminModal")
const jwt = require('jsonwebtoken');
const { protectAdminRoute } = require('../middleware/authMiddleware');
const User = require('../models/userModel');
const Permission = require('../models/PermissionModal');

// ================================================================
// User Authentication Part Come here
// ================================================================
// Route : Post /api/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await Admin.findOne({ email });
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
        console.log('JWT Secret:', process.env.JWT_SECRET_ADMIN);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_ADMIN, {
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
        const existingUser = await Admin.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new User (password will be hashed automatically via pre('save') middleware)
        const newUser = new Admin({
            email,
            password  // Save password as plain text, hashing will occur in the pre-save hook
        });

        // Save the new User to the database
        await newUser.save();

        // Generate JWT token for the newly registered User
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_ADMIN, {
            expiresIn: '6d',
        });

        res.status(201).json({ token, message: `${email} registered successfully` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// ================================================================
//For Granting Access to the User
// ================================================================

// PUT /admin/assign-permission
router.put('/assign-permission', protectAdminRoute, async (req, res) => {
    try {
        const { adminId, userId, permissions } = req.body;

        if (!userId || !permissions || typeof permissions !== 'object') {
            return res.status(400).json({ success: false, message: 'userId and permissions object are required' });
        }

        // Find the user
        const user = await User.findById(userId).populate('permission');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        let permissionDoc;

        if (user.permission) {
            // ⚙️ Only update the specific fields sent from frontend
            const updateFields = {};
            for (const key in permissions) {
                if (typeof permissions[key] === 'boolean') {
                    updateFields[`permissions.${key}`] = permissions[key];
                }
            }

            // Optionally update who granted it
            if (adminId) {
                updateFields.grantedBy = adminId;
            }

            permissionDoc = await Permission.findByIdAndUpdate(
                user.permission._id,
                { $set: updateFields },
                { new: true }
            );
        } else {
            // 🚫 Do not create default permissions
            // Only create a new permission doc if at least one field is explicitly passed
            if (Object.keys(permissions).length === 0) {
                return res.status(400).json({ success: false, message: 'At least one permission field is required' });
            }

            permissionDoc = await Permission.create({
                grantedBy: adminId,
                permissions: permissions
            });

            user.permission = permissionDoc._id;
            await user.save();
        }

        // Return updated user
        const updatedUser = await User.findById(user._id).populate('permission');

        return res.status(200).json({
            success: true,
            message: 'Permissions updated successfully',
            user: updatedUser
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});


// GET /user/info — protected user info with permission
// GET /admin/info — show all users with permissions and grantedBy info
router.get('/info', protectAdminRoute, async (req, res) => {
    try {
        const admin = req.admin;
        const allUsers = await User.find({})
            .select('-password') // exclude password
            .populate({
                path: 'permission',
                populate: {
                    path: 'grantedBy',
                    model: 'User',
                    select: 'email _id' // show only email and ID of grantedBy user
                }
            });

        res.status(200).json({
            success: true,
            adminInfo:admin,
            users: allUsers
        });
    } catch (err) {
        console.error('Error fetching user info:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
  

module.exports = router;
