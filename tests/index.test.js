/* eslint-env jest */

const zeroFill = require('zero-fill')
const shajs = require('sha.js')

const shareableSeed = require('../')
const testUtil = require('./testUtil')

test('mnemonicToShareableCode valid code 12 words', () => {
  var validMnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong'
  var validWordlistName = 'english'
  var validVersion = 'v1'
  var validCode = '01' + '00' + testUtil.mnemonicEntropyLengthHex(validMnemonic) + zeroFill(64, 'ffffffffffffffffffffffffffffffff')
  var checksum = shajs('sha256').update(validCode).digest('hex').slice(0, 8)
  expect(shareableSeed.mnemonicToShareableCode(validMnemonic, validVersion, validWordlistName)).toBe(validCode + checksum)
})

test('mnemonicToShareableCode valid code 12 words (2)', () => {
  var validMnemonic = 'legal winner thank year wave sausage worth useful legal winner thank yellow'
  var validWordlistName = 'english'
  var validVersion = 'v1'
  var validCode = '01' + '00' + testUtil.mnemonicEntropyLengthHex(validMnemonic) + zeroFill(64, '7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f')
  var checksum = shajs('sha256').update(validCode).digest('hex').slice(0, 8)
  expect(shareableSeed.mnemonicToShareableCode(validMnemonic, validVersion, validWordlistName)).toBe(validCode + checksum)
})

test('mnemonicToShareableCode valid code 18 words', () => {
  var validMnemonic = 'letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic avoid letter always'
  var validWordlistName = 'english'
  var validVersion = 'v1'
  var validCode = '01' + '00' + testUtil.mnemonicEntropyLengthHex(validMnemonic) + zeroFill(64, '808080808080808080808080808080808080808080808080')
  var checksum = shajs('sha256').update(validCode).digest('hex').slice(0, 8)
  expect(shareableSeed.mnemonicToShareableCode(validMnemonic, validVersion, validWordlistName)).toBe(validCode + checksum)
})

test('mnemonicToShareableCode valid code 24 words', () => {
  var validMnemonic = 'exile ask congress lamp submit jacket era scheme attend cousin alcohol catch course end lucky hurt sentence oven short ball bird grab wing top'
  var validWordlistName = 'english'
  var validVersion = 'v1'
  var validCode = '01' + '00' + testUtil.mnemonicEntropyLengthHex(validMnemonic) + zeroFill(64, '4fa1a8bc3e6d80ee1316050e862c1812031493212b7ec3f3bb1b08f168cabeef')
  var checksum = shajs('sha256').update(validCode).digest('hex').slice(0, 8)
  expect(shareableSeed.mnemonicToShareableCode(validMnemonic, validVersion, validWordlistName)).toBe(validCode + checksum)
})

test('shareableCodeToMnemonic valid code 12 words', () => {
  var mnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong'
  var wordlistCode = '00'
  var versionCode = '01'
  var entropyHex = 'ffffffffffffffffffffffffffffffff'
  var rawShareableCode = versionCode + wordlistCode + testUtil.mnemonicEntropyLengthHex(mnemonic) + zeroFill(64, entropyHex)
  var shareableCode = rawShareableCode + shajs('sha256').update(rawShareableCode).digest('hex').slice(0, 8)
  expect(shareableSeed.shareableCodeToMnemonic(shareableCode)).toBe(mnemonic)
})

test('shareableCodeToMnemonic valid code 18 words', () => {
  var mnemonic = 'letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic avoid letter always'
  var wordlistCode = '00'
  var versionCode = '01'
  var entropyHex = '808080808080808080808080808080808080808080808080'
  var rawShareableCode = versionCode + wordlistCode + testUtil.mnemonicEntropyLengthHex(mnemonic) + zeroFill(64, entropyHex)
  var shareableCode = rawShareableCode + shajs('sha256').update(rawShareableCode).digest('hex').slice(0, 8)
  expect(shareableSeed.shareableCodeToMnemonic(shareableCode)).toBe(mnemonic)
})

test('shareableCodeToMnemonic valid code 24 words', () => {
  var mnemonic = 'exile ask congress lamp submit jacket era scheme attend cousin alcohol catch course end lucky hurt sentence oven short ball bird grab wing top'
  var wordlistCode = '00'
  var versionCode = '01'
  var entropyHex = '4fa1a8bc3e6d80ee1316050e862c1812031493212b7ec3f3bb1b08f168cabeef'
  var rawShareableCode = versionCode + wordlistCode + testUtil.mnemonicEntropyLengthHex(mnemonic) + zeroFill(64, entropyHex)
  var shareableCode = rawShareableCode + shajs('sha256').update(rawShareableCode).digest('hex').slice(0, 8)
  expect(shareableSeed.shareableCodeToMnemonic(shareableCode)).toBe(mnemonic)
})

test('shareableCode<=>Mnemonic e2e (1)', () => {
  var mnemonic = 'exile ask congress lamp submit jacket era scheme attend cousin alcohol catch course end lucky hurt sentence oven short ball bird grab wing top'
  var wordlistName = 'english'
  var versionName = 'v1'
  var shareableCode = shareableSeed.mnemonicToShareableCode(mnemonic, versionName, wordlistName)
  expect(shareableSeed.shareableCodeToMnemonic(shareableCode)).toBe(mnemonic)
})

test('shareableCode<=>Mnemonic e2e (2)', () => {
  var mnemonic = 'letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic avoid letter always'
  var wordlistName = 'english'
  var versionName = 'v1'
  var shareableCode = shareableSeed.mnemonicToShareableCode(mnemonic, versionName, wordlistName)
  expect(shareableSeed.shareableCodeToMnemonic(shareableCode)).toBe(mnemonic)
})

test('shareableCode<=>Mnemonic e2e (2)', () => {
  var mnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong'
  var wordlistName = 'english'
  var versionName = 'v1'
  var shareableCode = shareableSeed.mnemonicToShareableCode(mnemonic, versionName, wordlistName)
  expect(shareableSeed.shareableCodeToMnemonic(shareableCode)).toBe(mnemonic)
})
