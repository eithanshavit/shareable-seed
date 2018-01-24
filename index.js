var bip39 = require('bip39')

const INVALID_MNEMONIC = 'Invalid mnemonic'

function validateMnemonic (mnemonic) {
  var mnemonicList = mnemonic.trim().split(/\s+/g)
  if (mnemonicList.count < 12 || mnemonicList.count > 24) throw new Error(INVALID_MNEMONIC)
  if (!bip39.validateMnemonic(mnemonic)) throw new Error(INVALID_MNEMONIC)
  return true
}

module.exports = {
  validateMnemonic
}
