/* eslint-env jest */

const validators = require('../lib/validators')
const errors = require('../lib/errors')

test('validateMnemonic passes', () => {
  var validMnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong'
  expect(validators.validateMnemonic(validMnemonic)).toBeTruthy()
})

test('validateMnemonic fails on invalid mnemonic', () => {
  var invalidMnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong wrong'
  expect(() => {
    validators.validateMnemonic(invalidMnemonic)
  }).toThrow(Error(errors.INVALID_MNEMONIC))
})

test('validateMnemonic fails on short mnemonic', () => {
  var invalidMnemonic = 'zoo zoo zoo'
  expect(() => {
    validators.validateMnemonic(invalidMnemonic)
  }).toThrow(Error(errors.INVALID_MNEMONIC))
})

test('validateMnemonic fails on long mnemonic', () => {
  var invalidMnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo'
  expect(() => {
    validators.validateMnemonic(invalidMnemonic)
  }).toThrow(Error(errors.INVALID_MNEMONIC))
})

test('validateThreshold fails on string', () => {
  var invalidThrshold = 'invalidThrshold'
  expect(() => {
    validators.validateThreshold(invalidThrshold)
  }).toThrow(Error(errors.INVALID_THRESHOLD))
})

test('validateThreshold fails on low threshold', () => {
  var invalidThrshold = 1
  expect(() => {
    validators.validateThreshold(invalidThrshold)
  }).toThrow(Error(errors.INVALID_THRESHOLD))
})

test('validateThreshold fails on high threshold', () => {
  var invalidThrshold = 300
  expect(() => {
    validators.validateThreshold(invalidThrshold)
  }).toThrow(Error(errors.INVALID_THRESHOLD))
})

test('validateThreshold passes', () => {
  var validThrshold = 3
  expect(validators.validateThreshold(validThrshold)).toBeTruthy()
})

test('validateShareCount fails on string', () => {
  var invalidShareCount = 'invalidShareCount'
  expect(() => {
    validators.validateShareCount(invalidShareCount)
  }).toThrow(Error(errors.INVALID_SHARE_COUNT))
})

test('validateShareCount fails on low', () => {
  var invalidShareCount = 1
  expect(() => {
    validators.validateShareCount(invalidShareCount)
  }).toThrow(Error(errors.INVALID_SHARE_COUNT))
})

test('validateShareCount fails on high', () => {
  var invalidShareCount = 300
  expect(() => {
    validators.validateShareCount(invalidShareCount)
  }).toThrow(Error(errors.INVALID_SHARE_COUNT))
})

test('validateShareCount passes', () => {
  var shareCount = 3
  expect(validators.validateThreshold(shareCount)).toBeTruthy()
})

test('validateWordlistName passes', () => {
  var validWordlistName = 'english'
  expect(validators.validateWordlistName(validWordlistName)).toBeTruthy()
})

test('validateWordlistName fails', () => {
  var invalidWordlistName = 'invalidWordlist'
  expect(() => {
    validators.validateWordlistName(invalidWordlistName)
  }).toThrow(Error(errors.INVALID_WORDLIST_NAME))
})

test('validateWordlistCode fails', () => {
  var invalidWordlistCode = 'FFF'
  expect(() => {
    validators.validateWordlistCode(invalidWordlistCode)
  }).toThrow(Error(errors.INVALID_WORDLIST_CODE))
})

test('validateWordlistCode passes', () => {
  var validWordlistCode = '00'
  expect(validators.validateWordlistCode(validWordlistCode)).toBeTruthy()
})

test('validateVersionName passes', () => {
  var validVersionName = 'v1'
  expect(validators.validateVersionName(validVersionName)).toBeTruthy()
})

test('validateVersionName fails', () => {
  var invalidVersionName = 'nonversion'
  expect(() => {
    validators.validateVersionName(invalidVersionName)
  }).toThrow(Error(errors.INVALID_SHAREABLE_CODE_VERSION))
})

test('validateVersionHex passes', () => {
  var validVersionHex = '01'
  expect(validators.validateVersionHex(validVersionHex)).toBeTruthy()
})

test('validateVersionHex fails', () => {
  var invalidVersionHex = '00'
  expect(() => {
    validators.validateVersionHex(invalidVersionHex)
  }).toThrow(Error(errors.INVALID_SHAREABLE_CODE_VERSION))
})

test('validateShareableCodeChecksum passes', () => {
  var validCode = '0100404fa1a8bc3e6d80ee1316050e862c1812031493212b7ec3f3bb1b08f168cabeef505ba346'
  expect(validators.validateShareableCodeChecksum(validCode)).toBeTruthy()
})

test('validateShareableCodeChecksum fails', () => {
  var invalidCode = '0100404fa1a8bc3e6d80ee1316050e862c1812031493212b7ec3f3bb1b08f168cabeef505ba347'
  expect(() => {
    validators.validateShareableCodeChecksum(invalidCode)
  }).toThrow(Error(errors.INVALID_SHAREABLE_CODE_CHECKSUM))
})
