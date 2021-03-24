const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const keys = require("../../config/keys")

// Load input validation
const validateRegisterInput = require("../../validation/register")
const validateLoginInput = require("../../validation/login")
const validateAccountInput = require("../../validation/account")

// Load User model
const User = require("../../models/User")

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body)
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }
  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      return res.status(400).json({ username: "Username already exists" })
    }
    else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
        })
      })
    }
  })
})

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body)

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const username = req.body.username
  const password = req.body.password

  // Find user by username
  User.findOne({ username }).then(user => {

    // Check if user exists
    if (!user) {
      return res.status(404).json({ usernamenotfound: "Incorrect Username or Password" })
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          username: user.username,
          email: user.email
        }
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 86400 // 24 hrs in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            })
          }
        )
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Incorrect Username or Password" })
      }
    })
  })
})

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/updateAccountInfo", (req, res) => {
  // Form validation
  const { errors, isValid } = validateAccountInput(req.body)
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }
  // use id to check current user info and compare
  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      return res.status(400).json({ username: "Username already exists" })
    }
    else {
      // query db for existing user, then update user doc with save()      
      User.findOne({ _id: req.body.id }).then(user => {
        if (user) {
          if (req.body.username.length > 0) {
            user.username = req.body.username
          }
          if (req.body.email.length > 0) {
            user.email = req.body.email
          }
          saveAccountInfo = () => {
            user.save()
              .then(user => {
                if (user) {
                  const payload = {
                    id: user.id,
                    username: user.username,
                    email: user.email
                  }
                  // Sign token
                  jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                      expiresIn: 86400 // 24 hrs in seconds
                    },
                    (err, token) => {
                      res.json({
                        success: true,
                        token: "Bearer " + token
                      })
                    }
                  )
                }
                else {
                  return res.status(404).json({ accountNotFound: "Account Not Found" })
                }
              })
              .catch(err => {
                return res.status(500).json({ serverError: "Server failed to update.", error: err })
              })
          }
          if (req.body.password.length > 7) {
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) throw err
                user.password = hash
                saveAccountInfo()
              })
            })
          } else {
            saveAccountInfo()
          }
        }
        else {
          return res.status(404).json({ account: "Account Not Found" })
        }
      })
    }
  })
})

module.exports = router
