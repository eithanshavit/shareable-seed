const shareableSeed = require('../');

test('mnemonicToShares returns 1', () => {
  expect(shareableSeed.mnemonicToShares()).toBe(1);
});
