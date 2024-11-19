const express = require("express");
const router = express.Router();
const courses = require("../models/courses");
const verifyToken = require("../middleware/authMiddleware");

router.get("/courses",verifyToken, async (req, res) => {
  const details = await courses.find({});
  res.json(details);
});

router.get("/courses/:id",verifyToken, async (req, res) => {
  const courseId = req.params.id;
  const details = await courses.findOne({ courseId: courseId }, { _id: 0 });
  res.json(details);
});

router.post("/courses",verifyToken, async (req, res) => {
  try {
    if (req.userType == "admin") {
      const data = req.body;
      const result = await courses.create(data);
      res.status(201).json("Added course successfully");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("error while adding data");
  }
});

router.put("/courses/:id",verifyToken, async (req, res) => {
  const data = req.body;
  const courseId = req.params.id;
  try {
    const result = await courses.findOneAndUpdate({ courseId: courseId }, data);
    if (!result) {
      return res.status(404).send("Course not found");
    }const express = require("express");
    const router = express.Router();
    const User = require("../models/User");
    
    const bcrypt = require("bcrypt");
    const jwt = require("jsonwebtoken");
    
    // User registration
    router.post("/register", async (req, res) => {
      try {
        // const {} = userDetails
        const userDetails = req.body;
        const username = userDetails.userName;
        const password = userDetails.password;
        const email = userDetails.email;
        const userType = userDetails.userType
        // const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, email, userType });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
      } catch (error) {
        console.log("err", error);
        res.status(500).json({ error: "Registration failed" });
      }
    });
    
    // User login
    router.post("/login", async (req, res) => {
      try {
        const { email, password } = req.body;
    
        console.log(email, password);
        const user = await User.findOne({ email });
        console.log(user, "user");
        if (!user) {
          return res
            .status(401)
            .json({ error: "Authentication failed- User doesn't exists" });
        }
    
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res
            .status(401)
            .json({ error: "Authentication failed- password doesn't match" });
        }
    
        const token = jwt.sign(
          { userId: user._id, userType: user.userType },
          "your-secret-key",
          {
            expiresIn: "1h",
          }
        );
    
        res.cookie("Authtoken", token);
        res.json({
          status: true,
          message: "login success",
          userType: user.userType
        });
        //  console.log('/login in the bakend res', res)
        return res;
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Login failed" });
      }
    });
    
    // Logout
    router.get("/logout", (req, res) => {
      res.clearCookie("Authtoken");
      res.status(200).send("Logout successful");
      return res;
    });
    
    module.exports = router;
    
    res.send("Course updated successfully");
  } catch (error) {
    res.status(500).send("error updating data");
  }
});

router.delete("/courses/:id",verifyToken, async (req, res) => {
  const courseId = req.params.id;
  try {
    const result = await courses.findOneAndDelete({ courseId: courseId });
    if (!result) {
      return res.status(404).send("Course not found");
    }
    res.send("Course deleted successfully");
  } catch (error) {
    res.status(500).send("error deleting data");
  }
});

module.exports = router;
