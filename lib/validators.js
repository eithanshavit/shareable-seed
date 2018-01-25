const bip39 = require('bip39')
const _ = require('lodash')
const shajs = require('sha.js')
const wordlistCodes = require('./wordlistCodes')
const versionCodes = require('./versionCodes')

const CHECKSUM_HEX_LENGTH = 8
const INVALID_MNEMONIC = 'Invalid mnemonic'
const INVALID_THRESHOLD = 'Invalid threshold'
const INVALID_WORDLIST_NAME = 'Invalid wordlist name'
const INVALID_WORDLIST_CODE = 'Invalid wordlist code'
const INVALID_SHAREABLE_CODE_VERSION = 'Invalid shareable code version'
const INVALID_SHAREABLE_CODE_CHECKSUM = 'Invalid shareable code checksum'

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

function validateVersion (version) {
  if (!versionCodes.hasOwnProperty(version)) throw new Error(INVALID_SHAREABLE_CODE_VERSION)
  return true
}

function validateWordlistCode (wordlistCode) {
  if (!_.find(wordlistCodes, function (v, k) { return v === wordlistCode })) throw new Error(INVALID_WORDLIST_CODE)
  return true
}

function validateShareableCodeChecksum (shareableCode) {
  const payload = shareableCode.slice(0, shareableCode.length - CHECKSUM_HEX_LENGTH)
  const computedChecksum = shajs('sha256').update(payload).digest('hex').slice(0, CHECKSUM_HEX_LENGTH)
  const givenChecksum = shareableCode.slice(shareableCode.length - CHECKSUM_HEX_LENGTH, shareableCode.length)
  if (givenChecksum !== computedChecksum) throw new Error(INVALID_SHAREABLE_CODE_CHECKSUM)
  return true
}

module.exports = {
  validateShareableCodeChecksum,
  validateWordlistCode,
  validateMnemonic,
  validateVersion,
  validateThreshold,
  validateWordlistName
}
