const bip39 = require('bip39')
const _ = require('lodash')
const shajs = require('sha.js')
const wordlistCodes = require('./wordlistCodes')
const versionCodes = require('./versionCodes')
const errors = require('./errors')

const CHECKSUM_HEX_LENGTH = 8
const MNEMONIC_WORD_COUNT_MIN = 12
const MNEMONIC_WORD_COUNT_MAX = 24
const SHARE_COUNT_MIN = 2
const SHARE_COUNT_MAX = 16
const THRESHOLD_MIN = 2
const THRESHOLD_MAX = SHARE_COUNT_MAX

function isNumber (value) {
  return typeof value === 'number' && isFinite(value)
}

function isString (value) {
  return typeof value === 'string' || value instanceof String
}

function validateShareList (shareList) {
  if (!Array.isArray(shareList)) throw new Error(errors.INVALID_SHARE_LIST)
  if (!_.every(shareList, function (share) { return isString(share) })) throw new Error(errors.INVALID_SHARE_LIST)
  return true
}

function validateMnemonic (mnemonic) {
  const mnemonicList = mnemonic.trim().split(/\s+/g)
  if (mnemonicList.count < MNEMONIC_WORD_COUNT_MIN || mnemonicList.count > MNEMONIC_WORD_COUNT_MAX) throw new Error(errors.INVALID_MNEMONIC)
  if (!bip39.validateMnemonic(mnemonic)) throw new Error(errors.INVALID_MNEMONIC)
  return true
}

function validateThreshold (threshold) {
  if (!isNumber(threshold)) throw new Error(errors.INVALID_THRESHOLD)
  if (threshold < THRESHOLD_MIN || threshold > THRESHOLD_MAX) throw new Error(errors.INVALID_THRESHOLD)
  return true
}

function validateShareCount (shareCount) {
  if (!isNumber(shareCount)) throw new Error(errors.INVALID_SHARE_COUNT)
  if (shareCount < SHARE_COUNT_MIN || shareCount > SHARE_COUNT_MAX) throw new Error(errors.INVALID_SHARE_COUNT)
  return true
}

function validateWordlistName (wordlistName) {
  if (!wordlistCodes.hasOwnProperty(wordlistName)) throw new Error(errors.INVALID_WORDLIST_NAME)
  return true
}

function validateVersionName (versionName) {
  if (!versionCodes.hasOwnProperty(versionName)) throw new Error(errors.INVALID_SHAREABLE_CODE_VERSION)
  return true
}

function isValidaVersionHex (versionHex) {
  return _.find(versionCodes, function (v, k) { return v === versionHex })
}

function validateVersionHex (versionHex) {
  if (!isValidaVersionHex(versionHex)) throw new Error(errors.INVALID_SHAREABLE_CODE_VERSION)
  return true
}

function validateWordlistCode (wordlistCode) {
  if (!_.find(wordlistCodes, function (v, k) { return v === wordlistCode })) throw new Error(errors.INVALID_WORDLIST_CODE)
  return true
}

function isValidShareableCodeChecksum (shareableCode) {
  const payload = shareableCode.slice(0, shareableCode.length - CHECKSUM_HEX_LENGTH)
  const computedChecksum = shajs('sha256').update(payload).digest('hex').slice(0, CHECKSUM_HEX_LENGTH)
  const givenChecksum = shareableCode.slice(shareableCode.length - CHECKSUM_HEX_LENGTH, shareableCode.length)
  if (givenChecksum !== computedChecksum) return false
  return true
}

function validateShareableCodeChecksum (shareableCode) {
  if (!isValidShareableCodeChecksum(shareableCode)) throw new Error(errors.INVALID_SHAREABLE_CODE_CHECKSUM)
  return true
}

module.exports = {
  validateShareableCodeChecksum,
  validateWordlistCode,
  validateMnemonic,
  validateShareList,
  validateVersionName,
  validateVersionHex,
  validateThreshold,
  validateShareCount,
  validateWordlistName
}
