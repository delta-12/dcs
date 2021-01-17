const express = require('express')
const mongoose = require('mongoose')
const passport = require("passport")
const minecraftServers = require("./routes/api/minecraftServers")
const users = require("./routes/api/users")
const app = express()
const path = require('path')

// Bodyparser middleware
const bodyParser = require("body-parser")
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(bodyParser.json())

// DB Config
const db = require("./config/keys").mongoURI

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err))

// Passport middleware
app.use(passport.initialize())
// Passport config
require("./config/passport")(passport)
// Routes
app.use("/api/users", users)
app.use("/api/minecraftServers", minecraftServers)

// Set static folder
app.use(express.static('../dcs/build'))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dcs/build/index.html'))
})

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server up and running on port ${port} !`))
