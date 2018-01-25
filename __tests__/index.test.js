/* eslint-env jest */

const shareableSeed = require('../')

test('thresholdToHexCode valid threshold', () => {
  var validThreshold = 9
  expect(shareableSeed.thresholdToHexCode(validThreshold)).toBe('09')
})

test('thresholdToHexCode valid threshold 2', () => {
  var validThreshold = 25
  expect(shareableSeed.thresholdToHexCode(validThreshold)).toBe('19')
})
