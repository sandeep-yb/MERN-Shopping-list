const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");

/**
 * @route POST api/users
 * @desc  Register a new user
 * @access public
 */
router.post("/", (req, res, next) => {
  // res.send({msg: 'register'});

  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password)
    res.status(400).json({ msg: "Please enter all the fields" });

  // Check for existing user
  User.findOne({ email })
    .then((user) => {
      if (user) return res.status(400).json({ msg: "User already exists" });

      const newUser = new User({
        name,
        email,
        password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(password, salt, (err, hash) => {
          if (err) return next(err);

          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
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
                  return res.json({
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
        });
      });
    })
    .catch((err) => next(err));
});

module.exports = router;
