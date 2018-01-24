const bip39 = require('bip39')
const wordlistCodes = require('./lib/wordlistCodes')

const INVALID_MNEMONIC = 'Invalid mnemonic'
const INVALID_THRESHOLD = 'Invalid threshold'
const INVALID_WORDLIST_NAME = 'Invalid wordlist name'

function isNumber (value) {
  return typeof value === 'number' && isFinite(value)
}

function validateMnemonic (mnemonic) {
  const mnemonicList = mnemonic.trim().split(/\s+/g)
  if (mnemonicList.count < 12 || mnemonicList.count > 24) throw new Error(INVALID_MNEMONIC)
  if (!bip39.validateMnemonic(mnemonic)) throw new Error(INVALID_MNEMONIC)
  return true
}

function validateThreshold (threshold) {
  if (!isNumber(threshold)) throw new Error(INVALID_THRESHOLD)
  if (threshold < 2 || threshold >= 2 ** 8) throw new Error(INVALID_THRESHOLD)
  return true
}

function validateWordlistName (wordlistName) {
  if (!wordlistCodes.hasOwnProperty(wordlistName)) throw new Error(INVALID_WORDLIST_NAME)
  return true
}

module.exports = {
  validateMnemonic,
  validateThreshold,
  validateWordlistName
}
