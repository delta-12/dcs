const express = require("express")
const router = express.Router()
const axios = require("axios")
const querystring = require("querystring")

// Load User and MinecraftServer model
const User = require("../../models/User")
const MinecraftServer = require("../../models/MinecraftServer")
const MCHost = require("../../models/MCHost")

// Load input validation
const validateAddServerInput = require("../../validation/addServer")

// @route POST api/MinecraftServer/info
// @desc get MinecraftServer info
// @access Public, should be private?
router.post("/info", (req, res) => {
  User.findOne({ _id: req.body.id }).then(user => {
    if (!user) {
      return res.status(404).json({ UserIDNotFound: "No user ID found" })
    }
    else {
      // need to use cursor if number of servers grows VERY large
      MinecraftServer.find({ $or:[ {"owner":req.body.id}, {"public": true} ] }).then(serverList => {
        if (serverList) {
          return res.status(200).json({ success: true, data: serverList })
        }
        else {
          return res.status(404).json({ success: false, error: "Minecraft Server List Not Found" })
        }
      })
    }
  })
})

router.post("/hosts", (req, res) => {
  User.findOne({ _id: req.body.id }).then(user => {
    if (!user) {
      return res.status(404).json({ UserIDNotFound: "No user ID found" })
    }
    else {
      // need to use cursor if number of servers grows VERY large
      MCHost.find().then(hosts => {
        if (hosts) {
          return res.status(200).json({ hosts: hosts })
        }
        else {
          return res.status(404).json({ error: "No hosts found." })
        }
      })
    }
  })
})

router.post("/createServer", (req, res) => {
  User.findOne({ _id: req.body.id }).then(user => {
    if (!user) {
      return res.status(404).json({ UserIDNotFound: "No user ID found" })
    }
    else {
      // Form validation
      const { errors, isValid } = validateAddServerInput(req.body)
      // Check validation
      if (!isValid) {
        return res.status(400).json(errors)
      }
      MinecraftServer.findOne({ name: req.body.name }).then(server => {
        if (server) {
          return res.status(400).json({ success: false, name: "A server already exists with that name" })
        }
        else {
          const newServer = {
            user_id: req.body.id,
            // address: req.body.address,
            name: req.body.name,
            gamemode: req.body.gamemode,
            difficulty: req.body.difficulty,
            seed: req.body.seed,
            software: req.body.software,
            version: req.body.version,
            public: req.body.public
          }
          axios
            .post("http://" + req.body.address + ":5001/create_server", querystring.stringify(newServer), { timeout: 60000 })  // create stream to monitor progress of server creation?
            .then(response => {
              return res.status(201).json({ success: true, response: response.data })
            })
            .catch(err => {
              console.log(err)  // remove in final production code? 
              if (err.code === "ECONNABORTED" || err.code === "ECONNREFUSED") {
                return res.status(503).json({ success: false, error: "Hosting provider is unavailable.  Try a different hosting provider."})
              }
              return res.status(400).json({ success: false, error: err })
          })
        }
      })
    }
  })
})

router.post("/deleteServer", (req, res) => {
  User.findOne({ _id: req.body.user_id }).then(user => {
    if (!user) {
      return res.status(404).json({ UserIDNotFound: "No user ID found" })
    }
    else {
      MinecraftServer.findOne({ _id: req.body.server_id }).then(server => {
        if (!server) {
          return res.status(404).json({ error: "No server found." })
        }
        else {
          const delServer = {
            user_id: req.body.user_id,
            server_id: req.body.server_id
          }
          axios
            .post("http://" + req.body.address + ":5001/delete_server", querystring.stringify(delServer))  // create stream to monitor progress of server creation?
            .then(response => {
              return res.status(200).json({ success: true, response: response.data })
            })
            .catch(err => {
              console.log(err)  // remove in final production code? 
              if (err.code === "ECONNABORTED" || err.code === "ECONNREFUSED") {
                return res.status(503).json({ success: false, error: "Hosting provider is unavailable." })
              }
              return res.status(400).json({ success: false, error: err })
            })
        }
      })
    }
  })
})

module.exports = router
