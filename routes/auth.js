const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * @api POST /api/auth
 * @desc authenticate a user
 * @access public
 */
router.post("/", (req, res, next) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password)
    return res.status(400).json({ msg: "please enter all the fields" });

  User.findOne({ email })
    .then((user) => {
      if (!user) return res.status(400).json({ msg: "User does not exist" });
    //   console.log("user", user);
    //   console.log("password", password);
      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch)
            return res.status(400).json({ msg: "Invalid credentials" });

          jwt.sign(
            {
              id: user.id,
            },
            config.get("jwtSecret"),
            {
              expiresIn: 3600,
            },
            (err, token) => {
              if (err) return next(err);

              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          );
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

module.exports = router;
