/* eslint-env jest */

const validators = require('../lib/validators')
const errors = require('../lib/errors')

test('validateMnemonic passes', () => {
  const validMnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong'
  expect(validators.validateMnemonic(validMnemonic)).toBeTruthy()
})

test('validateMnemonic fails on invalid mnemonic', () => {
  const invalidMnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong wrong'
  expect(() => {
    validators.validateMnemonic(invalidMnemonic)
  }).toThrow(Error(errors.INVALID_MNEMONIC))
})

test('validateMnemonic fails on short mnemonic', () => {
  const invalidMnemonic = 'zoo zoo zoo'
  expect(() => {
    validators.validateMnemonic(invalidMnemonic)
  }).toThrow(Error(errors.INVALID_MNEMONIC))
})

test('validateMnemonic fails on long mnemonic', () => {
  const invalidMnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo'
  expect(() => {
    validators.validateMnemonic(invalidMnemonic)
  }).toThrow(Error(errors.INVALID_MNEMONIC))
})

test('validateThreshold fails on string', () => {
  const invalidThrshold = 'invalidThrshold'
  expect(() => {
    validators.validateThreshold(invalidThrshold)
  }).toThrow(Error(errors.INVALID_THRESHOLD))
})

test('validateThreshold fails on low threshold', () => {
  const invalidThrshold = 1
  expect(() => {
    validators.validateThreshold(invalidThrshold)
  }).toThrow(Error(errors.INVALID_THRESHOLD))
})

test('validateThreshold fails on high threshold', () => {
  const invalidThrshold = 300
  expect(() => {
    validators.validateThreshold(invalidThrshold)
  }).toThrow(Error(errors.INVALID_THRESHOLD))
})

test('validateThreshold passes', () => {
  const validThrshold = 3
  expect(validators.validateThreshold(validThrshold)).toBeTruthy()
})

test('validateShareCount fails on string', () => {
  const invalidShareCount = 'invalidShareCount'
  expect(() => {
    validators.validateShareCount(invalidShareCount)
  }).toThrow(Error(errors.INVALID_SHARE_COUNT))
})

test('validateShareCount fails on low', () => {
  const invalidShareCount = 1
  expect(() => {
    validators.validateShareCount(invalidShareCount)
  }).toThrow(Error(errors.INVALID_SHARE_COUNT))
})

test('validateShareCount fails on high', () => {
  const invalidShareCount = 300
  expect(() => {
    validators.validateShareCount(invalidShareCount)
  }).toThrow(Error(errors.INVALID_SHARE_COUNT))
})

test('validateShareCount passes', () => {
  const shareCount = 3
  expect(validators.validateThreshold(shareCount)).toBeTruthy()
})

test('validateWordlistName passes', () => {
  const validWordlistName = 'english'
  expect(validators.validateWordlistName(validWordlistName)).toBeTruthy()
})

test('validateWordlistName fails', () => {
  const invalidWordlistName = 'invalidWordlist'
  expect(() => {
    validators.validateWordlistName(invalidWordlistName)
  }).toThrow(Error(errors.INVALID_WORDLIST_NAME))
})

test('validateWordlistCode fails', () => {
  const invalidWordlistCode = 'FFF'
  expect(() => {
    validators.validateWordlistCode(invalidWordlistCode)
  }).toThrow(Error(errors.INVALID_WORDLIST_CODE))
})

test('validateWordlistCode passes', () => {
  const validWordlistCode = '00'
  expect(validators.validateWordlistCode(validWordlistCode)).toBeTruthy()
})

test('validateVersionName passes', () => {
  const validVersionName = 'v1'
  expect(validators.validateVersionName(validVersionName)).toBeTruthy()
})

test('validateVersionName fails', () => {
  const invalidVersionName = 'nonversion'
  expect(() => {
    validators.validateVersionName(invalidVersionName)
  }).toThrow(Error(errors.INVALID_SHAREABLE_CODE_VERSION))
})

test('validateVersionHex passes', () => {
  const validVersionHex = '01'
  expect(validators.validateVersionHex(validVersionHex)).toBeTruthy()
})

test('validateVersionHex fails', () => {
  const invalidVersionHex = '00'
  expect(() => {
    validators.validateVersionHex(invalidVersionHex)
  }).toThrow(Error(errors.INVALID_SHAREABLE_CODE_VERSION))
})

test('validateShareableCodeChecksum passes', () => {
  const validCode = '0100404fa1a8bc3e6d80ee1316050e862c1812031493212b7ec3f3bb1b08f168cabeef505ba346'
  expect(validators.validateShareableCodeChecksum(validCode)).toBeTruthy()
})

test('validateShareableCodeChecksum fails', () => {
  const invalidCode = '0100404fa1a8bc3e6d80ee1316050e862c1812031493212b7ec3f3bb1b08f168cabeef505ba347'
  expect(() => {
    validators.validateShareableCodeChecksum(invalidCode)
  }).toThrow(Error(errors.INVALID_SHAREABLE_CODE_CHECKSUM))
})

test('validateShareList valid list', () => {
  const shareList = ['1', '2', '3']
  expect(validators.validateShareList(shareList)).toBeTruthy()
})

test('validateShareList invalid list (1)', () => {
  const shareList = [1, '2', '3']
  expect(() => {
    validators.validateShareList(shareList)
  }).toThrow(Error(errors.INVALID_SHARE_LIST))
})

test('validateShareList invalid list (2)', () => {
  const shareList = 'Hello'
  expect(() => {
    validators.validateShareList(shareList)
  }).toThrow(Error(errors.INVALID_SHARE_LIST))
})
