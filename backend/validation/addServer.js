const Validator = require("validator")
const isEmpty = require("is-empty")

module.exports = function validateRegisterInput(data) {
  let errors = {}

  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : ""

  // name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required."
  }
  // name can only contain letters and numbers
  if (!Validator.isAlphanumeric(data.name)) {
    errors.name = "Name can only contain letters and numbers."
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
