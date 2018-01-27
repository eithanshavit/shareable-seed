const zeroFill = require('zero-fill')

function numberToHexCode (number, length, isZeroPadded) {
  const numberOfBits = 4 * length
  const trimmedNumber = number % Math.pow(2, numberOfBits)
  const numberInHex = trimmedNumber.toString(16).slice(0, length)
  if (isZeroPadded) {
    return zeroFill(length, numberInHex)
  }
  return numberInHex
}

module.exports = {
  numberToHexCode
}
