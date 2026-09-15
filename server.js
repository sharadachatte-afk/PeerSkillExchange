const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const bcrypt = require("bcryptjs");

const User = require("./User");
const Request = require("./Request");

const app = express();


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(express.static("."));
app.use(cors());
app.use(express.json());


// ==========================================
// HOME ROUTE
// ==========================================

app.get("/", (req, res) => {

    res.json({
        message: "Peer Skills Exchange API is running!"
    });

});


// ==========================================
// REGISTER ROUTE
// ==========================================

app.post("/api/register", async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            department,
            year,
            teachSkills,
            learnSkills
        } = req.body;


        // Check required fields
        if (!name || !email || !password || !department || !year) {

            return res.status(400).json({
                message: "Please fill all required fields."
            });

        }


        // Check if email already exists
        const existingUser = await User.findOne({
            email: email.toLowerCase()
        });


        if (existingUser) {

            return res.status(409).json({
                message: "Email already registered."
            });

        }


        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);


        // Create user
        const user = await User.create({

            name: name,

            email: email.toLowerCase(),

            password: hashedPassword,

            department: department,

            year: year,

            teachSkills: teachSkills || [],

            learnSkills: learnSkills || []

        });


        // Send response
        res.status(201).json({

            message: "Registration successful!",

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                department: user.department,

                year: user.year,

                teachSkills: user.teachSkills,

                learnSkills: user.learnSkills

            }

        });

    } catch (error) {

        console.error("Registration error:", error);

        res.status(500).json({
            message: "Server error."
        });

    }

});


// ==========================================
// LOGIN ROUTE
// ==========================================

app.post("/api/login", async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        // Check email and password
        if (!email || !password) {

            return res.status(400).json({
                message: "Please enter email and password."
            });

        }


        // Find user
        const user = await User.findOne({

            email: email.toLowerCase()

        });


        // User not found
        if (!user) {

            return res.status(401).json({
                message: "Invalid email or password."
            });

        }


        // Compare password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );


        // Wrong password
        if (!passwordMatch) {

            return res.status(401).json({
                message: "Invalid email or password."
            });

        }


        // Login successful
        res.json({

            message: "Login successful!",

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                department: user.department,

                year: user.year,

                teachSkills: user.teachSkills,

                learnSkills: user.learnSkills

            }

        });

    } catch (error) {

        console.error("Login error:", error);

        res.status(500).json({
            message: "Server error."
        });

    }

});


// ==========================================
// FIND PEERS ROUTE
// ==========================================

app.get("/api/peers", async (req, res) => {

    try {

        const skill = req.query.skill;


        if (!skill) {

            return res.status(400).json({
                message: "Please enter a skill."
            });

        }


        const peers = await User.find({

            teachSkills: {
                $regex: skill,
                $options: "i"
            }

        }).select("-password");


        res.json(peers);

    } catch (error) {

        console.error("Find peers error:", error);

        res.status(500).json({
            message: "Server error."
        });

    }

});


// ==========================================
// SEND REQUEST ROUTE
// ==========================================

app.post("/api/requests", async (req, res) => {

    try {

        const {
            sender,
            receiver
        } = req.body;


        // Check sender and receiver
        if (!sender || !receiver) {

            return res.status(400).json({

                message: "Sender and receiver are required."

            });

        }


        // Prevent sending request to yourself
        if (sender === receiver) {

            return res.status(400).json({

                message: "You cannot send a request to yourself."

            });

        }


        // Check if request already exists
        const existingRequest = await Request.findOne({

            sender: sender,

            receiver: receiver,

            status: "pending"

        });


        if (existingRequest) {

            return res.status(409).json({

                message: "Request already sent."

            });

        }


        // Create request
        const request = await Request.create({

            sender: sender,

            receiver: receiver

        });


        // Send response
        res.status(201).json({

            message: "Request sent successfully!",

            request: request

        });

    } catch (error) {

        console.error("Send request error:", error);

        res.status(500).json({

            message: "Server error."

        });

    }

});
// ==========================================
// GET RECEIVED REQUESTS
// ==========================================

app.get("/api/requests/:userId", async (req, res) => {

    try {

        const userId = req.params.userId;

        const requests = await Request.find({
            receiver: userId
        })
        .populate("sender", "name email department year teachSkills learnSkills")
        .sort({ createdAt: -1 });

        res.json(requests);

    } catch (error) {

        console.error("Get requests error:", error);

        res.status(500).json({
            message: "Server error."
        });

    }

});
// ==========================================
// ACCEPT REQUEST
// ==========================================

app.put("/api/requests/:requestId/accept", async (req, res) => {

    try {

        const requestId = req.params.requestId;

        const request = await Request.findByIdAndUpdate(
            requestId,
            {
                status: "accepted"
            },
            {
                new: true
            }
        );

        if (!request) {

            return res.status(404).json({
                message: "Request not found."
            });

        }

        res.json({
            message: "Request accepted!",
            request: request
        });

    } catch (error) {

        console.error("Accept request error:", error);

        res.status(500).json({
            message: "Server error."
        });

    }

});


// ==========================================
// REJECT REQUEST
// ==========================================

app.put("/api/requests/:requestId/reject", async (req, res) => {

    try {

        const requestId = req.params.requestId;

        const request = await Request.findByIdAndUpdate(
            requestId,
            {
                status: "rejected"
            },
            {
                new: true
            }
        );

        if (!request) {

            return res.status(404).json({
                message: "Request not found."
            });

        }

        res.json({
            message: "Request rejected!",
            request: request
        });

    } catch (error) {

        console.error("Reject request error:", error);

        res.status(500).json({
            message: "Server error."
        });

    }

});
// ==========================================
// UPDATE USER PROFILE
// ==========================================

app.put("/api/users/:userId", async (req, res) => {

    try {

        const userId = req.params.userId;

        const {
            name,
            department,
            year,
            teachSkills,
            learnSkills
        } = req.body;


        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                name: name,
                department: department,
                year: year,
                teachSkills: teachSkills || [],
                learnSkills: learnSkills || []
            },
            {
                new: true
            }
        ).select("-password");


        if (!updatedUser) {

            return res.status(404).json({
                message: "User not found."
            });

        }


        res.json({
            message: "Profile updated successfully!",
            user: updatedUser
        });


    } catch (error) {

        console.error("Update profile error:", error);

        res.status(500).json({
            message: "Server error."
        });

    }

});
// ==========================================
// FIND SKILL MATCHES
// ==========================================

app.get("/api/matches/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find the current user
        const currentUser = await User.findById(userId)
            .select("learnSkills");

        if (!currentUser) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        // Get all other users
        const users = await User.find({
            _id: { $ne: userId }
        }).select("-password");

        // Skills the current user wants to learn
        const wantedSkills = currentUser.learnSkills.map(skill =>
            skill.toLowerCase().trim()
        );

        // Find users who can teach those skills
        const matches = users
            .map(user => {

                const matchedSkills = user.teachSkills.filter(skill =>
                    wantedSkills.includes(
                        skill.toLowerCase().trim()
                    )
                );

                return {
                    ...user.toObject(),
                    matchedSkills: matchedSkills
                };
            })
            .filter(user => user.matchedSkills.length > 0);

        res.json(matches);

    } catch (error) {
        console.error("Matching error:", error);

        res.status(500).json({
            message: "Server error."
        });
    }
});

// ==========================================
// CONNECT TO MONGODB
// ==========================================

mongoose.connect(process.env.MONGO_URI)

    .then(() => {

        console.log("MongoDB connected successfully!");


        app.listen(process.env.PORT, () => {

            console.log(
                `Server running on http://localhost:${process.env.PORT}`
            );

        });

    })

    .catch((error) => {

        console.error("MongoDB connection failed:");

        console.error(error);

    });