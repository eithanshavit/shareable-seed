/* eslint-env jest */

const validators = require('../lib/validators')

test('validateMnemonic passes', () => {
  var validMnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong'
  expect(validators.validateMnemonic(validMnemonic)).toBeTruthy()
})

test('validateMnemonic fails on invalid mnemonic', () => {
  var invalidMnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong wrong'
  expect(() => {
    validators.validateMnemonic(invalidMnemonic)
  }).toThrow(Error('Invalid mnemonic'))
})

test('validateMnemonic fails on short mnemonic', () => {
  var invalidMnemonic = 'zoo zoo zoo'
  expect(() => {
    validators.validateMnemonic(invalidMnemonic)
  }).toThrow(Error('Invalid mnemonic'))
})

test('validateMnemonic fails on long mnemonic', () => {
  var invalidMnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo'
  expect(() => {
    validators.validateMnemonic(invalidMnemonic)
  }).toThrow(Error('Invalid mnemonic'))
})

test('validateThreshold fails on string', () => {
  var invalidThrshold = 'invalidThrshold'
  expect(() => {
    validators.validateThreshold(invalidThrshold)
  }).toThrow(Error('Invalid threshold'))
})

test('validateThreshold fails on low threshold', () => {
  var invalidThrshold = 1
  expect(() => {
    validators.validateThreshold(invalidThrshold)
  }).toThrow(Error('Invalid threshold'))
})

test('validateThreshold fails on high threshold', () => {
  var invalidThrshold = 300
  expect(() => {
    validators.validateThreshold(invalidThrshold)
  }).toThrow(Error('Invalid threshold'))
})

test('validateThreshold passes', () => {
  var validThrshold = 3
  expect(validators.validateThreshold(validThrshold)).toBeTruthy()
})

test('validateWordlistName passes', () => {
  var validWordlistName = 'english'
  expect(validators.validateWordlistName(validWordlistName)).toBeTruthy()
})

test('validateWordlistName fails', () => {
  var invalidWordlistName = 'invalidWordlist'
  expect(() => {
    validators.validateWordlistName(invalidWordlistName)
  }).toThrow(Error('Invalid wordlist name'))
})

test('validateWordlistCode fails', () => {
  var invalidWordlistCode = 'FFF'
  expect(() => {
    validators.validateWordlistCode(invalidWordlistCode)
  }).toThrow(Error('Invalid wordlist code'))
})

test('validateWordlistCode passes', () => {
  var validWordlistCode = '00'
  expect(validators.validateWordlistCode(validWordlistCode)).toBeTruthy()
})

test('validateVersion passes', () => {
  var validateVersion = 'v1'
  expect(validators.validateVersion(validateVersion)).toBeTruthy()
})

test('validateVersion fails', () => {
  var invalidVersion = 'nonversion'
  expect(() => {
    validators.validateVersion(invalidVersion)
  }).toThrow(Error('Invalid shareable seed version'))
})
