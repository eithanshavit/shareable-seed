/* eslint-env jest */

const shareableSeed = require('../')

test('mnemonicToShareableCode valid code 12 words', () => {
  var validMnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong'
  var validWordlistName = 'english'
  var validVersion = 'v1'
  var validCode = '01002000000000000000000000000000000000ffffffffffffffffffffffffffffffff'
  expect(shareableSeed.mnemonicToShareableCode(validMnemonic, validVersion, validWordlistName)).toBe(validCode)
})

test('mnemonicToShareableCode valid code 12 words (2)', () => {
  var validMnemonic = 'legal winner thank year wave sausage worth useful legal winner thank yellow'
  var validWordlistName = 'english'
  var validVersion = 'v1'
  var validCode = '010020000000000000000000000000000000007f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f'
  expect(shareableSeed.mnemonicToShareableCode(validMnemonic, validVersion, validWordlistName)).toBe(validCode)
})

test('mnemonicToShareableCode valid code 18 words', () => {
  var validMnemonic = 'letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic avoid letter always'
  var validWordlistName = 'english'
  var validVersion = 'v1'
  var validCode = '0100300000000000000000808080808080808080808080808080808080808080808080'
  expect(shareableSeed.mnemonicToShareableCode(validMnemonic, validVersion, validWordlistName)).toBe(validCode)
})

test('mnemonicToShareableCode valid code 24 words', () => {
  var validMnemonic = 'exile ask congress lamp submit jacket era scheme attend cousin alcohol catch course end lucky hurt sentence oven short ball bird grab wing top'
  var validWordlistName = 'english'
  var validVersion = 'v1'
  var validCode = '0100404fa1a8bc3e6d80ee1316050e862c1812031493212b7ec3f3bb1b08f168cabeef'
  expect(shareableSeed.mnemonicToShareableCode(validMnemonic, validVersion, validWordlistName)).toBe(validCode)
})
