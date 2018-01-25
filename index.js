const bip39 = require('bip39')
const _ = require('lodash')
const zeroFill = require('zero-fill')
const shajs = require('sha.js')
const validators = require('./lib/validators')
const wordlistCodes = require('./lib/wordlistCodes')
const versionCodes = require('./lib/versionCodes')
const util = require('./lib/util')

const INVALID_WORDLIST_NAME = 'Invalid wordlist name'
const ENTROPY_LENGTH_PADDED_HEX = 2
const ENTROPY_PADDED_LENGTH = 64
const CHECKSUM_HEX_LENGTH = 8

function mnemonicToEntropy (mnemonic, wordlistName) {
  validators.validateWordlistName(wordlistName)
  const wordlist = _.get(bip39.wordlists, wordlistName)
  if (!wordlist) throw new Error(INVALID_WORDLIST_NAME)
  return bip39.mnemonicToEntropy(mnemonic, wordlist)
}

function mnemonicToShareableCode (mnemonic, versionName, wordlistName) {
  validators.validateMnemonic(mnemonic)
  validators.validateVersionName(versionName)
  validators.validateWordlistName(wordlistName)
  const wordlistCode = _.get(wordlistCodes, wordlistName)
  const entropyHex = mnemonicToEntropy(mnemonic, wordlistName)
  const paddedEntropyHex = zeroFill(ENTROPY_PADDED_LENGTH, entropyHex)
  const entropyLenghHex = util.numberToHexCode(entropyHex.length, ENTROPY_LENGTH_PADDED_HEX, true)
  const versionCode = _.get(versionCodes, versionName, '00')
  const rawShareableCode = versionCode + wordlistCode + entropyLenghHex + paddedEntropyHex
  // Shareable Code Format: <versionCode(8bitHex)><wordlistCode(8bitHex)><entropyLenghHex(8bitHex)><entropy(128-256bitHex)><checksum(32bitHex)>
  const checksum = shajs('sha256').update(rawShareableCode).digest('hex').slice(0, CHECKSUM_HEX_LENGTH)
  return rawShareableCode + checksum
}

module.exports = {
  mnemonicToShareableCode
}
