/* eslint-env jest */
const zeroFill = require('zero-fill')
const shajs = require('sha.js')

const extractors = require('../lib/extractors')
const testUtil = require('./testUtil')

test('extractVersion v1', () => {
  var mnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong'
  var wordlistCode = '00'
  var versionCode = '01'
  var entropyHex = 'ffffffffffffffffffffffffffffffff'
  var rawShareableCode = versionCode + wordlistCode + testUtil.mnemonicEntropyLengthHex(mnemonic) + zeroFill(64, entropyHex)
  var shareableCode = rawShareableCode + shajs('sha256').update(rawShareableCode).digest('hex').slice(0, 8)
  expect(extractors.extractVersionHex(shareableCode)).toBe(versionCode)
})

test('extractWordlistCode v1', () => {
  var mnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong'
  var wordlistCode = '00'
  var versionCode = '01'
  var entropyHex = 'ffffffffffffffffffffffffffffffff'
  var rawShareableCode = versionCode + wordlistCode + testUtil.mnemonicEntropyLengthHex(mnemonic) + zeroFill(64, entropyHex)
  var shareableCode = rawShareableCode + shajs('sha256').update(rawShareableCode).digest('hex').slice(0, 8)
  expect(extractors.extractWordlistCode(shareableCode)).toBe(wordlistCode)
})

test('extractEntropyLength v1 (1)', () => {
  var mnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong'
  var wordlistCode = '00'
  var versionCode = '01'
  var entropyHex = 'ffffffffffffffffffffffffffffffff'
  var rawShareableCode = versionCode + wordlistCode + testUtil.mnemonicEntropyLengthHex(mnemonic) + zeroFill(64, entropyHex)
  var shareableCode = rawShareableCode + shajs('sha256').update(rawShareableCode).digest('hex').slice(0, 8)
  expect(extractors.extractEntropyLength(shareableCode)).toBe(parseInt(testUtil.mnemonicEntropyLengthHex(mnemonic), 16))
})

test('extractEntropyLength v1 (2)', () => {
  var mnemonic = 'letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic avoid letter always'
  var wordlistCode = '00'
  var versionCode = '01'
  var entropyHex = '808080808080808080808080808080808080808080808080'
  var rawShareableCode = versionCode + wordlistCode + testUtil.mnemonicEntropyLengthHex(mnemonic) + zeroFill(64, entropyHex)
  var shareableCode = rawShareableCode + shajs('sha256').update(rawShareableCode).digest('hex').slice(0, 8)
  expect(extractors.extractEntropyLength(shareableCode)).toBe(parseInt(testUtil.mnemonicEntropyLengthHex(mnemonic), 16))
})

test('extractEntropyHex v1 (1)', () => {
  var mnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong'
  var wordlistCode = '00'
  var versionCode = '01'
  var entropyHex = 'ffffffffffffffffffffffffffffffff'
  var rawShareableCode = versionCode + wordlistCode + testUtil.mnemonicEntropyLengthHex(mnemonic) + zeroFill(64, entropyHex)
  var shareableCode = rawShareableCode + shajs('sha256').update(rawShareableCode).digest('hex').slice(0, 8)
  expect(extractors.extractEntropyHex(shareableCode)).toBe(entropyHex)
})

test('extractEntropyHex v1 (2)', () => {
  var mnemonic = 'letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic avoid letter always'
  var wordlistCode = '00'
  var versionCode = '01'
  var entropyHex = '808080808080808080808080808080808080808080808080'
  var rawShareableCode = versionCode + wordlistCode + testUtil.mnemonicEntropyLengthHex(mnemonic) + zeroFill(64, entropyHex)
  var shareableCode = rawShareableCode + shajs('sha256').update(rawShareableCode).digest('hex').slice(0, 8)
  expect(extractors.extractEntropyHex(shareableCode)).toBe(entropyHex)
})

test('extractEntropyHex v1 (3)', () => {
  var mnemonic = 'exile ask congress lamp submit jacket era scheme attend cousin alcohol catch course end lucky hurt sentence oven short ball bird grab wing top'
  var wordlistCode = '00'
  var versionCode = '01'
  var entropyHex = '4fa1a8bc3e6d80ee1316050e862c1812031493212b7ec3f3bb1b08f168cabeef'
  var rawShareableCode = versionCode + wordlistCode + testUtil.mnemonicEntropyLengthHex(mnemonic) + zeroFill(64, entropyHex)
  var shareableCode = rawShareableCode + shajs('sha256').update(rawShareableCode).digest('hex').slice(0, 8)
  expect(extractors.extractEntropyHex(shareableCode)).toBe(entropyHex)
})
