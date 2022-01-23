/* eslint-env jest */

const zeroFill = require('zero-fill')
const shajs = require('sha.js')
const _ = require('lodash')

const shareableSeed = require('../')
const errors = require('../lib/errors')
const testUtil = require('./testUtil')

test('mnemonicToShareableCode valid code 12 words', () => {
  const validMnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong'
  const validWordlistName = 'english'
  const validVersion = 'v1'
  const validCode = '01' + '00' + testUtil.mnemonicEntropyLengthHex(validMnemonic) + zeroFill(64, 'ffffffffffffffffffffffffffffffff')
  const checksum = shajs('sha256').update(validCode).digest('hex').slice(0, 8)
  expect(shareableSeed.mnemonicToShareableCode(validMnemonic, validVersion, validWordlistName)).toBe(validCode + checksum)
})

test('mnemonicToShareableCode valid code 12 words (2)', () => {
  const validMnemonic = 'legal winner thank year wave sausage worth useful legal winner thank yellow'
  const validWordlistName = 'english'
  const validVersion = 'v1'
  const validCode = '01' + '00' + testUtil.mnemonicEntropyLengthHex(validMnemonic) + zeroFill(64, '7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f')
  const checksum = shajs('sha256').update(validCode).digest('hex').slice(0, 8)
  expect(shareableSeed.mnemonicToShareableCode(validMnemonic, validVersion, validWordlistName)).toBe(validCode + checksum)
})

test('mnemonicToShareableCode valid code 18 words', () => {
  const validMnemonic = 'letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic avoid letter always'
  const validWordlistName = 'english'
  const validVersion = 'v1'
  const validCode = '01' + '00' + testUtil.mnemonicEntropyLengthHex(validMnemonic) + zeroFill(64, '808080808080808080808080808080808080808080808080')
  const checksum = shajs('sha256').update(validCode).digest('hex').slice(0, 8)
  expect(shareableSeed.mnemonicToShareableCode(validMnemonic, validVersion, validWordlistName)).toBe(validCode + checksum)
})

test('mnemonicToShareableCode valid code 24 words', () => {
  const validMnemonic = 'exile ask congress lamp submit jacket era scheme attend cousin alcohol catch course end lucky hurt sentence oven short ball bird grab wing top'
  const validWordlistName = 'english'
  const validVersion = 'v1'
  const validCode = '01' + '00' + testUtil.mnemonicEntropyLengthHex(validMnemonic) + zeroFill(64, '4fa1a8bc3e6d80ee1316050e862c1812031493212b7ec3f3bb1b08f168cabeef')
  const checksum = shajs('sha256').update(validCode).digest('hex').slice(0, 8)
  expect(shareableSeed.mnemonicToShareableCode(validMnemonic, validVersion, validWordlistName)).toBe(validCode + checksum)
})

test('shareableCodeToMnemonic valid code 12 words', () => {
  const mnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong'
  const wordlistCode = '00'
  const versionCode = '01'
  const entropyHex = 'ffffffffffffffffffffffffffffffff'
  const rawShareableCode = versionCode + wordlistCode + testUtil.mnemonicEntropyLengthHex(mnemonic) + zeroFill(64, entropyHex)
  const shareableCode = rawShareableCode + shajs('sha256').update(rawShareableCode).digest('hex').slice(0, 8)
  expect(shareableSeed.shareableCodeToMnemonic(shareableCode)).toBe(mnemonic)
})

test('shareableCodeToMnemonic valid code 18 words', () => {
  const mnemonic = 'letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic avoid letter always'
  const wordlistCode = '00'
  const versionCode = '01'
  const entropyHex = '808080808080808080808080808080808080808080808080'
  const rawShareableCode = versionCode + wordlistCode + testUtil.mnemonicEntropyLengthHex(mnemonic) + zeroFill(64, entropyHex)
  const shareableCode = rawShareableCode + shajs('sha256').update(rawShareableCode).digest('hex').slice(0, 8)
  expect(shareableSeed.shareableCodeToMnemonic(shareableCode)).toBe(mnemonic)
})

test('shareableCodeToMnemonic valid code 24 words', () => {
  const mnemonic = 'exile ask congress lamp submit jacket era scheme attend cousin alcohol catch course end lucky hurt sentence oven short ball bird grab wing top'
  const wordlistCode = '00'
  const versionCode = '01'
  const entropyHex = '4fa1a8bc3e6d80ee1316050e862c1812031493212b7ec3f3bb1b08f168cabeef'
  const rawShareableCode = versionCode + wordlistCode + testUtil.mnemonicEntropyLengthHex(mnemonic) + zeroFill(64, entropyHex)
  const shareableCode = rawShareableCode + shajs('sha256').update(rawShareableCode).digest('hex').slice(0, 8)
  expect(shareableSeed.shareableCodeToMnemonic(shareableCode)).toBe(mnemonic)
})

test('shareableCode<=>Mnemonic e2e (1)', () => {
  const mnemonic = 'exile ask congress lamp submit jacket era scheme attend cousin alcohol catch course end lucky hurt sentence oven short ball bird grab wing top'
  const wordlistName = 'english'
  const versionName = 'v1'
  const shareableCode = shareableSeed.mnemonicToShareableCode(mnemonic, versionName, wordlistName)
  expect(shareableSeed.shareableCodeToMnemonic(shareableCode)).toBe(mnemonic)
})

test('shareableCode<=>Mnemonic e2e (2)', () => {
  const mnemonic = 'letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic avoid letter always'
  const wordlistName = 'english'
  const versionName = 'v1'
  const shareableCode = shareableSeed.mnemonicToShareableCode(mnemonic, versionName, wordlistName)
  expect(shareableSeed.shareableCodeToMnemonic(shareableCode)).toBe(mnemonic)
})

test('shareableCode<=>Mnemonic e2e (2)', () => {
  const mnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong'
  const wordlistName = 'english'
  const versionName = 'v1'
  const shareableCode = shareableSeed.mnemonicToShareableCode(mnemonic, versionName, wordlistName)
  expect(shareableSeed.shareableCodeToMnemonic(shareableCode)).toBe(mnemonic)
})

test('mnemonicToShares (1)', () => {
  const mnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong'
  const wordlistName = 'english'
  const versionName = 'v1'
  const shareCount = 3
  const threshold = 2
  const shares = shareableSeed.mnemonicToShares(mnemonic, shareCount, threshold, versionName, wordlistName)
  for (let i = 1; i < shareCount + 1; i++) {
    expect(Object.prototype.hasOwnProperty.call(shares, i)).toBeTruthy()
  }
})

test('mnemonicToShares (2)', () => {
  const mnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong'
  const wordlistName = 'english'
  const versionName = 'v1'
  const shareCount = 9
  const threshold = 9
  const shares = shareableSeed.mnemonicToShares(mnemonic, shareCount, threshold, versionName, wordlistName)
  for (let i = 1; i < shareCount + 1; i++) {
    expect(Object.prototype.hasOwnProperty.call(shares, i)).toBeTruthy()
  }
})

test('mnemonicToShares (3)', () => {
  const mnemonic = 'seed sock milk update focus rotate barely fade car face mechanic mercy'
  const wordlistName = 'english'
  const versionName = 'v1'
  const shareCount = 3
  const threshold = 2
  const shares = shareableSeed.mnemonicToShares(mnemonic, shareCount, threshold, versionName, wordlistName)
  for (let i = 1; i < shareCount + 1; i++) {
    expect(Object.prototype.hasOwnProperty.call(shares, i)).toBeTruthy()
  }
})

test('Mnemonic<=>Shares e2e 24 words 9/9 shares', () => {
  const mnemonic = 'exile ask congress lamp submit jacket era scheme attend cousin alcohol catch course end lucky hurt sentence oven short ball bird grab wing top'
  const wordlistName = 'english'
  const versionName = 'v1'
  const shareCount = 9
  const threshold = 9
  const sharesList = _.values(shareableSeed.mnemonicToShares(mnemonic, shareCount, threshold, versionName, wordlistName))
  expect(shareableSeed.shareListToMnemonic(sharesList)).toBe(mnemonic)
})

test('Mnemonic<=>Shares e2e 24 words 4/9 shares', () => {
  const mnemonic = 'exile ask congress lamp submit jacket era scheme attend cousin alcohol catch course end lucky hurt sentence oven short ball bird grab wing top'
  const wordlistName = 'english'
  const versionName = 'v1'
  const shareCount = 9
  const threshold = 4
  const sharesList = _.values(shareableSeed.mnemonicToShares(mnemonic, shareCount, threshold, versionName, wordlistName)).slice(0, 4)
  expect(shareableSeed.shareListToMnemonic(sharesList)).toBe(mnemonic)
})

test('Mnemonic<=>Shares e2e 18 words 1/2 shares', () => {
  const mnemonic = 'letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic avoid letter always'
  const wordlistName = 'english'
  const versionName = 'v1'
  const shareCount = 3
  const threshold = 2
  const sharesList = _.values(shareableSeed.mnemonicToShares(mnemonic, shareCount, threshold, versionName, wordlistName)).slice(0, 2)
  expect(shareableSeed.shareListToMnemonic(sharesList)).toBe(mnemonic)
})

test('Mnemonic<=>Shares e2e 12 words 2/2 shares', () => {
  const mnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong'
  const wordlistName = 'english'
  const versionName = 'v1'
  const shareCount = 2
  const threshold = 2
  const sharesList = _.values(shareableSeed.mnemonicToShares(mnemonic, shareCount, threshold, versionName, wordlistName))
  expect(shareableSeed.shareListToMnemonic(sharesList)).toBe(mnemonic)
})

test('Mnemonic<=>Shares e2e 24 words 4/9 shares not enough', () => {
  const mnemonic = 'exile ask congress lamp submit jacket era scheme attend cousin alcohol catch course end lucky hurt sentence oven short ball bird grab wing top'
  const wordlistName = 'english'
  const versionName = 'v1'
  const shareCount = 9
  const threshold = 4
  const sharesList = _.values(shareableSeed.mnemonicToShares(mnemonic, shareCount, threshold, versionName, wordlistName)).slice(0, 2)
  expect(shareableSeed.shareListToMnemonic(sharesList)).toBeNull()
})

test('Mnemonic<=>Shares e2e 18 words 4/9 shares not enough', () => {
  const mnemonic = 'letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic avoid letter always'
  const wordlistName = 'english'
  const versionName = 'v1'
  const shareCount = 9
  const threshold = 4
  const sharesList = _.values(shareableSeed.mnemonicToShares(mnemonic, shareCount, threshold, versionName, wordlistName)).slice(0, 2)
  expect(shareableSeed.shareListToMnemonic(sharesList)).toBeNull()
})

test('Mnemonic<=>Shares e2e 18 words 4/9 shares not enough', () => {
  const mnemonic = 'letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic avoid letter always'
  const wordlistName = 'english'
  const versionName = 'v1'
  const shareCount = 9
  const threshold = 4
  const sharesList = _.values(shareableSeed.mnemonicToShares(mnemonic, shareCount, threshold, versionName, wordlistName)).slice(0, 1)
  expect(shareableSeed.shareListToMnemonic(sharesList)).toBeNull()
})

test('Mnemonic<=>Shares e2e invalid mnemonic', () => {
  const mnemonic = 'invalid advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic avoid letter always'
  const wordlistName = 'english'
  const versionName = 'v1'
  const shareCount = 9
  const threshold = 4
  expect(() => {
    const sharesList = _.values(shareableSeed.mnemonicToShares(mnemonic, shareCount, threshold, versionName, wordlistName)).slice(0, 2)
    shareableSeed.shareListToMnemonic(sharesList)
  }).toThrow(Error(errors.INVALID_MNEMONIC))
})
