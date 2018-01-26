const validators = require('./validators')
const versionCodes = require('./versionCodes')
const errors = require('./errors')

const VERSION_HEX_LENGTH = 2
const VERSION_V1_WORDLIST_CODE_OFFSET = 2
const VERSION_V1_WORDLIST_CODE_LENGTH = 2
const VERSION_V1_ENTROPY_LENGTH_HEX_OFFSET = 4
const VERSION_V1_ENTROPY_LENGTH_HEX_LENGTH = 2
const VERSION_V1_ENTROPY_HEX_OFFSET = 6
const VERSION_V1_ENTROPY_HEX_MAX_LENGTH = 64

function extractVersionHex (shareableCode) {
  validators.validateShareableCodeChecksum(shareableCode)
  const versionHex = shareableCode.slice(0, VERSION_HEX_LENGTH)
  validators.validateVersionHex(versionHex)
  return versionHex
}

function extractWordlistCode (shareableCode) {
  validators.validateShareableCodeChecksum(shareableCode)
  const versionHex = extractVersionHex(shareableCode)
  switch (versionHex) {
    case versionCodes.v1:
      return shareableCode.slice(VERSION_V1_WORDLIST_CODE_OFFSET, VERSION_V1_WORDLIST_CODE_OFFSET + VERSION_V1_WORDLIST_CODE_LENGTH)
    default:
      throw new Error(errors.INVALID_SHAREABLE_CODE_VERSION)
  }
}

function extractEntropyLength (shareableCode) {
  validators.validateShareableCodeChecksum(shareableCode)
  const versionHex = extractVersionHex(shareableCode)
  switch (versionHex) {
    case versionCodes.v1:
      const entropyLenghHex = shareableCode.slice(VERSION_V1_ENTROPY_LENGTH_HEX_OFFSET, VERSION_V1_ENTROPY_LENGTH_HEX_OFFSET + VERSION_V1_ENTROPY_LENGTH_HEX_LENGTH)
      return parseInt(entropyLenghHex, 16)
    default:
      throw new Error(errors.INVALID_SHAREABLE_CODE_VERSION)
  }
}

function extractEntropyHex (shareableCode) {
  validators.validateShareableCodeChecksum(shareableCode)
  const versionHex = extractVersionHex(shareableCode)
  switch (versionHex) {
    case versionCodes.v1:
      const entropyLength = extractEntropyLength(shareableCode)
      const offset = VERSION_V1_ENTROPY_HEX_OFFSET + (VERSION_V1_ENTROPY_HEX_MAX_LENGTH - entropyLength)
      const entropyHex = shareableCode.slice(offset, offset + entropyLength)
      return entropyHex
    default:
      throw new Error(errors.INVALID_SHAREABLE_CODE_VERSION)
  }
}

module.exports = {
  extractVersionHex,
  extractWordlistCode,
  extractEntropyLength,
  extractEntropyHex
}
