/* eslint-env jest */
const zeroFill = require('zero-fill')
const shajs = require('sha.js')

const extractors = require('../lib/extractors')
const util = require('../lib/util')

function mnemonicEntropyLengthHex (mnemonic) {
  var mnemonicWordCount = mnemonic.trim().split(/\s+/g).length
  return util.numberToHexCode(mnemonicWordCount * 32 / 12, 2, true)
}

test('extractVersion v1', () => {
  var mnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong'
  var wordlistCode = '00'
  var versionCode = '01'
  var entropyHex = 'ffffffffffffffffffffffffffffffff'
  var rawShareableCode = versionCode + wordlistCode + mnemonicEntropyLengthHex(mnemonic) + zeroFill(64, entropyHex)
  var shareableCode = rawShareableCode + shajs('sha256').update(rawShareableCode).digest('hex').slice(0, 8)
  expect(extractors.extractVersionHex(shareableCode)).toBe(versionCode)
})

test('extractWordlistCode v1', () => {
  var mnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong'
  var wordlistCode = '00'
  var versionCode = '01'
  var entropyHex = 'ffffffffffffffffffffffffffffffff'
  var rawShareableCode = versionCode + wordlistCode + mnemonicEntropyLengthHex(mnemonic) + zeroFill(64, entropyHex)
  var shareableCode = rawShareableCode + shajs('sha256').update(rawShareableCode).digest('hex').slice(0, 8)
  expect(extractors.extractWordlistCode(shareableCode)).toBe(wordlistCode)
})

test('extractEntropyLength v1', () => {
  var mnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong'
  var wordlistCode = '00'
  var versionCode = '01'
  var entropyHex = 'ffffffffffffffffffffffffffffffff'
  var rawShareableCode = versionCode + wordlistCode + mnemonicEntropyLengthHex(mnemonic) + zeroFill(64, entropyHex)
  var shareableCode = rawShareableCode + shajs('sha256').update(rawShareableCode).digest('hex').slice(0, 8)
  expect(extractors.extractEntropyLength(shareableCode)).toBe(parseInt(mnemonicEntropyLengthHex(mnemonic), 16))
})

test('extractEntropyHex v1', () => {
  var mnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong'
  var wordlistCode = '00'
  var versionCode = '01'
  var entropyHex = 'ffffffffffffffffffffffffffffffff'
  var rawShareableCode = versionCode + wordlistCode + mnemonicEntropyLengthHex(mnemonic) + zeroFill(64, entropyHex)
  var shareableCode = rawShareableCode + shajs('sha256').update(rawShareableCode).digest('hex').slice(0, 8)
  expect(extractors.extractEntropyHex(shareableCode)).toBe(entropyHex)
})
