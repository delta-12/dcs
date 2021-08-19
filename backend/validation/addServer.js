const Validator = require("validator")
const isEmpty = require("is-empty")

module.exports = function validateRegisterInput(data) {
  let errors = {}

  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : ""
  data.difficulty = !isEmpty(data.difficulty) ? data.difficulty : ""
  data.gamemode = !isEmpty(data.gamemode) ? data.gamemode : ""

  // name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required."
  }
  // name can only contain letters and numbers
  if (!Validator.isAlphanumeric(data.name)) {
    errors.name = "Name can only contain letters and numbers."
  }
  if (!Validator.isEmpty(data.difficulty)) {
    (data.difficulty !== "peaceful") ?
      (data.difficulty !== "easy") ? 
        (data.difficulty !== "normal") ?
          (data.difficulty !== "hard") ? errors.difficulty = "Unknown difficulty." : null
        : null
      : null
    : null
  }
  if (!Validator.isEmpty(data.gamemode)) {
    (data.gamemode !== "survival") ?
      (data.gamemode !== "creative") ? 
        (data.gamemode !== "adventure") ?
          (data.gamemode !== "spectator") ? errors.gamemode = "Unknown gamemode." : null
        : null
      : null
    : null
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
