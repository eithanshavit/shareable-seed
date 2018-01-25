/* eslint-env jest */

const shareableSeed = require('../')

test('validateMnemonic passes', () => {
  var validMnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong'
  expect(shareableSeed.validateMnemonic(validMnemonic)).toBeTruthy()
})

test('validateMnemonic fails on invalid mnemonic', () => {
  var invalidMnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong wrong'
  expect(() => {
    shareableSeed.validateMnemonic(invalidMnemonic)
  }).toThrow(Error('Invalid mnemonic'))
})

test('validateMnemonic fails on short mnemonic', () => {
  var invalidMnemonic = 'zoo zoo zoo'
  expect(() => {
    shareableSeed.validateMnemonic(invalidMnemonic)
  }).toThrow(Error('Invalid mnemonic'))
})

test('validateMnemonic fails on long mnemonic', () => {
  var invalidMnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo'
  expect(() => {
    shareableSeed.validateMnemonic(invalidMnemonic)
  }).toThrow(Error('Invalid mnemonic'))
})

test('validateThreshold fails on string', () => {
  var invalidThrshold = 'invalidThrshold'
  expect(() => {
    shareableSeed.validateThreshold(invalidThrshold)
  }).toThrow(Error('Invalid threshold'))
})

test('validateThreshold fails on low threshold', () => {
  var invalidThrshold = 1
  expect(() => {
    shareableSeed.validateThreshold(invalidThrshold)
  }).toThrow(Error('Invalid threshold'))
})

test('validateThreshold fails on high threshold', () => {
  var invalidThrshold = 300
  expect(() => {
    shareableSeed.validateThreshold(invalidThrshold)
  }).toThrow(Error('Invalid threshold'))
})

test('validateThreshold passes', () => {
  var validThrshold = 3
  expect(shareableSeed.validateThreshold(validThrshold)).toBeTruthy()
})

test('validateWordlistName passes', () => {
  var validWordlistName = 'english'
  expect(shareableSeed.validateWordlistName(validWordlistName)).toBeTruthy()
})

test('validateWordlistName fails', () => {
  var invalidWordlistName = 'invalidWordlist'
  expect(() => {
    shareableSeed.validateWordlistName(invalidWordlistName)
  }).toThrow(Error('Invalid wordlist name'))
})

test('validateWordlistCode fails', () => {
  var invalidWordlistCode = 'FFF'
  expect(() => {
    shareableSeed.validateWordlistCode(invalidWordlistCode)
  }).toThrow(Error('Invalid wordlist code'))
})

test('validateWordlistCode passes', () => {
  var validWordlistCode = '00'
  expect(shareableSeed.validateWordlistCode(validWordlistCode)).toBeTruthy()
})

test('thresholdToHexCode valid threshold', () => {
  var validThreshold = 9
  expect(shareableSeed.thresholdToHexCode(validThreshold)).toBe('09')
})

test('thresholdToHexCode valid threshold 2', () => {
  var validThreshold = 25
  expect(shareableSeed.thresholdToHexCode(validThreshold)).toBe('19')
})

test('validateVersion passes', () => {
  var validateVersion = 'v1'
  expect(shareableSeed.validateVersion(validateVersion)).toBeTruthy()
})

test('validateVersion fails', () => {
  var invalidVersion = 'nonversion'
  expect(() => {
    shareableSeed.validateVersion(invalidVersion)
  }).toThrow(Error('Invalid shareable seed version'))
})
