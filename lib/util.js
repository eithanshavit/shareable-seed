const zeroFill = require('zero-fill')

function numberToHexCode (number, length, isZeroPadded) {
  const numberInHex = (number % (2 ** (4 * length))).toString(16).slice(0, length)
  if (isZeroPadded) {
    return zeroFill(length, numberInHex)
  }
  return numberInHex
}

module.exports = {
  numberToHexCode
}
