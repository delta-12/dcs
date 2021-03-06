const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Create Schema
const MinecraftServerSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String
  },
  address: {
    type: String
  },
  port: {
    type: String
  },
  onlinePlayers: {
    type: String
  },
  maxPlayers: {
    type: String
  },
  gamemode: {
    type: String
  },
  difficulty: {
    type: String
  },
  seed: {
    type: String
  },
  software: {
    type: String
  },
  version: {
    type: String
  },
  container_id: {
    type: String,
    required: true
  },
  public: {
    type: Boolean
  },
  owner: {
    type: String,
    required: true
  }
})

module.exports = MinecraftServer = mongoose.model("minecraft_servers", MinecraftServerSchema)  // switch to  test_minecraft_servers for testing
