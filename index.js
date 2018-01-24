const bip39 = require('bip39')
const _ = require('lodash')
const wordlistCodes = require('./lib/wordlistCodes')

const INVALID_MNEMONIC = 'Invalid mnemonic'
const INVALID_THRESHOLD = 'Invalid threshold'
const INVALID_WORDLIST_NAME = 'Invalid wordlist name'
const INVALID_WORDLIST_CODE = 'Invalid wordlist code'

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

function validateWordlistCode (wordlistCode) {
  if (!_.find(wordlistCodes, function (v, k) { console.log(k, v); return v === wordlistCode })) throw new Error(INVALID_WORDLIST_CODE)
  return true
}

module.exports = {
  validateWordlistCode,
  validateMnemonic,
  validateThreshold,
  validateWordlistName
}
