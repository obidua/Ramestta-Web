const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require("path")
const userRoute = require('./routers/userRouter');
const aminRoute = require('./routers/AdminRoute');

const colors = require("colors");

dotenv.config();
connectDB();


const app = express();
app.use(express.json()); // to access JSON Data
app.use(bodyParser.json());

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://192.168.1.44:5173' 
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));



// ✅ Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.get('/', async (req, res) => {
  res.send("API is running successfully");
})
// Routes
app.use('/user', userRoute);
app.use('/admin', aminRoute);


// Error Handling Middleware (Optional)
app.use((err, req, res, next) => {
  console.error(err.stack.red);
  res.status(500).send({ message: "Internal Server Error" });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT,'0.0.0.0', console.log(`Server Started on PORT ${PORT}`.yellow.bold));


