const bip39 = require('bip39')
const _ = require('lodash')
const zeroFill = require('zero-fill')
const validators = require('./lib/validators')
const wordlistCodes = require('./lib/wordlistCodes')
const versionCodes = require('./lib/versionCodes')
const util = require('./lib/util')

const INVALID_WORDLIST_NAME = 'Invalid wordlist name'
const ENTROY_BYTE_COUNT_PADDED_LENGTH = 2
const ENTROPY_HEX_PADDED_LENGTH = 64

function mnemonicToEntropy (mnemonic, wordlistName) {
  validators.validateWordlistName(wordlistName)
  const wordlist = _.get(bip39.wordlists, wordlistName)
  if (!wordlist) throw new Error(INVALID_WORDLIST_NAME)
  return bip39.mnemonicToEntropy(mnemonic, wordlist)
}

function mnemonicToShareableCode (mnemonic, version, wordlistName) {
  validators.validateMnemonic(mnemonic)
  validators.validateVersion(version)
  validators.validateWordlistName(wordlistName)
  const wordlistCode = _.get(wordlistCodes, wordlistName)
  const entropy = mnemonicToEntropy(mnemonic, wordlistName)
  const paddedEntropy = zeroFill(ENTROPY_HEX_PADDED_LENGTH, entropy)
  const entropyByteCountCode = util.numberToHexCode(entropy.length, ENTROY_BYTE_COUNT_PADDED_LENGTH, true)
  const versionCode = _.get(versionCodes, 'v1', '00')
  // Shareable Code Format: <versionCode(8bitHex)><wordlistCode(8bitHex)><entropyByteCountCode(8bitHex)><entropy(128-256bitHex)>
  return versionCode + wordlistCode + entropyByteCountCode + paddedEntropy
}

module.exports = {
  mnemonicToShareableCode
}
