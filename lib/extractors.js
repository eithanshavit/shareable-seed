const validators = require('./validators')
const versionCodes = require('./versionCodes')
const errors = require('./errors')

const VERSION_HEX_LENGTH = 2
const VERSION_V1_WORDLIST_CODE_OFFSET = 2
const VERSION_V1_WORDLIST_CODE_LENGTH = 2

function extractVersionHex (shareableCode) {
  validators.validateShareableCodeChecksum(shareableCode)
  return shareableCode.slice(0, VERSION_HEX_LENGTH)
}

function extractWordlistCode (shareableCode) {
  validators.validateShareableCodeChecksum(shareableCode)
  const versionHex = extractVersionHex(shareableCode)
  validators.validateVersionHex(versionHex)
  switch (versionHex) {
    case versionCodes.v1:
      return shareableCode.slice(VERSION_V1_WORDLIST_CODE_OFFSET, VERSION_V1_WORDLIST_CODE_OFFSET + VERSION_V1_WORDLIST_CODE_LENGTH)
    default:
      throw new Error(errors.INVALID_MNEMONIC)
  }
}

module.exports = {
  extractVersionHex,
  extractWordlistCode
}
