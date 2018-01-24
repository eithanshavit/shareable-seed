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
