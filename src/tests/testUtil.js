const util = require('../lib/util')

function mnemonicEntropyLengthHex (mnemonic) {
  const mnemonicWordCount = mnemonic.trim().split(/\s+/g).length
  return util.numberToHexCode(mnemonicWordCount * 32 / 12, 2, true)
}

module.exports = {
  mnemonicEntropyLengthHex
}
