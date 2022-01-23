/* eslint-env jest */

const util = require('../lib/util')

test('numberToHexCode 9 len 1 padded', () => {
  const number = 9
  expect(util.numberToHexCode(number, 1, true)).toBe('9')
})

test('numberToHexCode 9 len 2 padded', () => {
  const number = 9
  expect(util.numberToHexCode(number, 2, true)).toBe('09')
})

test('numberToHexCode 9 len 2 non padded', () => {
  const number = 9
  expect(util.numberToHexCode(number, 2, false)).toBe('9')
})

test('numberToHexCode 14 len 2 non padded', () => {
  const number = 14
  expect(util.numberToHexCode(number, 2, false)).toBe('e')
})

test('numberToHexCode 14 len 2 padded', () => {
  const number = 14
  expect(util.numberToHexCode(number, 2, true)).toBe('0e')
})

test('numberToHexCode 14 len 3 non padded', () => {
  const number = 14
  expect(util.numberToHexCode(number, 3, false)).toBe('e')
})

test('numberToHexCode 14 len 3 non padded', () => {
  const number = 14
  expect(util.numberToHexCode(number, 3, false)).toBe('e')
})

test('numberToHexCode 24 len 1 padded', () => {
  const number = 24
  expect(util.numberToHexCode(number, 1, true)).toBe('8')
})

test('numberToHexCode 24 len 1 padded', () => {
  const number = 24
  expect(util.numberToHexCode(number, 1, false)).toBe('8')
})

test('numberToHexCode 24 len 2 padded', () => {
  const number = 24
  expect(util.numberToHexCode(number, 2, false)).toBe('18')
})

test('numberToHexCode 24 len 2 non padded', () => {
  const number = 24
  expect(util.numberToHexCode(number, 2, true)).toBe('18')
})

test('numberToHexCode 345 len 3 padded', () => {
  const number = 345
  expect(util.numberToHexCode(number, 3, true)).toBe('159')
})

test('numberToHexCode 345 len 4 padded', () => {
  const number = 345
  expect(util.numberToHexCode(number, 4, true)).toBe('0159')
})

test('numberToHexCode 345 len 2 non padded', () => {
  const number = 345
  expect(util.numberToHexCode(number, 2, false)).toBe('59')
})

test('numberToHexCode 345 len 1 non padded', () => {
  const number = 345
  expect(util.numberToHexCode(number, 1, false)).toBe('9')
})
