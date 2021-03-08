const express = require("express")
const router = express.Router()

// Load User and MinecraftServer model
const User = require("../../models/User")
const MinecraftServer = require("../../models/MinecraftServer")

// @route POST api/MinecraftServer/info
// @desc get MinecraftServer info
// @access Public, should be private?
router.post("/info", (req, res) => {

  User.findOne({ _id: req.body.id }).then(user => {
    if (!user) {
      return res.status(404).json({ UserIDNotFound: "No user ID found" });
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

module.exports = router
