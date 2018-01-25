/* eslint-env jest */

const zeroFill = require('zero-fill')
const shajs = require('sha.js')

const shareableSeed = require('../')
const util = require('../lib/util')

function mnemonicEntropyHexLengthHex (mnemonic) {
  var mnemonicWordCount = mnemonic.trim().split(/\s+/g).length
  return util.numberToHexCode(mnemonicWordCount * 32 / 12, 2, true)
}

test('mnemonicToShareableCode valid code 12 words', () => {
  var validMnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong'
  var validWordlistName = 'english'
  var validVersion = 'v1'
  var validCode = '01' + '00' + mnemonicEntropyHexLengthHex(validMnemonic) + zeroFill(64, 'ffffffffffffffffffffffffffffffff')
  var checksum = shajs('sha256').update(validCode).digest('hex').slice(0, 8)
  expect(shareableSeed.mnemonicToShareableCode(validMnemonic, validVersion, validWordlistName)).toBe(validCode + checksum)
})

test('mnemonicToShareableCode valid code 12 words (2)', () => {
  var validMnemonic = 'legal winner thank year wave sausage worth useful legal winner thank yellow'
  var validWordlistName = 'english'
  var validVersion = 'v1'
  var validCode = '01' + '00' + mnemonicEntropyHexLengthHex(validMnemonic) + zeroFill(64, '7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f')
  var checksum = shajs('sha256').update(validCode).digest('hex').slice(0, 8)
  expect(shareableSeed.mnemonicToShareableCode(validMnemonic, validVersion, validWordlistName)).toBe(validCode + checksum)
})

test('mnemonicToShareableCode valid code 18 words', () => {
  var validMnemonic = 'letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic avoid letter always'
  var validWordlistName = 'english'
  var validVersion = 'v1'
  var validCode = '01' + '00' + mnemonicEntropyHexLengthHex(validMnemonic) + zeroFill(64, '0000000000000000808080808080808080808080808080808080808080808080')
  var checksum = shajs('sha256').update(validCode).digest('hex').slice(0, 8)
  expect(shareableSeed.mnemonicToShareableCode(validMnemonic, validVersion, validWordlistName)).toBe(validCode + checksum)
})

test('mnemonicToShareableCode valid code 24 words', () => {
  var validMnemonic = 'exile ask congress lamp submit jacket era scheme attend cousin alcohol catch course end lucky hurt sentence oven short ball bird grab wing top'
  var validWordlistName = 'english'
  var validVersion = 'v1'
  var validCode = '01' + '00' + mnemonicEntropyHexLengthHex(validMnemonic) + zeroFill(64, '4fa1a8bc3e6d80ee1316050e862c1812031493212b7ec3f3bb1b08f168cabeef')
  var checksum = shajs('sha256').update(validCode).digest('hex').slice(0, 8)
  expect(shareableSeed.mnemonicToShareableCode(validMnemonic, validVersion, validWordlistName)).toBe(validCode + checksum)
})
