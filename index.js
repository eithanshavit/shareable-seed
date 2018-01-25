const zeroFill = require('zero-fill')
const validators = require('./lib/validators')

function thresholdToHexCode (threshold) {
  validators.validateThreshold(threshold)
  const adujustedThreshold = threshold % (2 ** 8)
  return zeroFill(2, adujustedThreshold.toString(16))
}

module.exports = {
  thresholdToHexCode
}
