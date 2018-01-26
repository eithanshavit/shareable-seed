# Shareable Seed

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

A utility package for splitting a BIP39 seed mnemonic into *shares* that can later be combined to recover the seed.

## Why should I use this?
Use this method to securely distribute your BIP39 mnemonic among your trusted ones to protect from theft and to allow recovery during a disaster.

## Is it secure?
Each *share* is completely meaningless on it's own and a single person holding a share cannot steal your funds. The original BIP39 mnemonic **can only be recovered** by combining the shares together.

A threshold can be provided to allow a minimum number of the total *shares* to be collected in order to recover the mnemonic. For example: Given a seed mnemonic split into 4 with a threshold of 3, one of the shares can be lost or stolen, and still the mnemonic can be recovered using the 3 available ones.

## How does it work?
*shareable-seed* encodes mnemonic seeds into a special format called a `shareable_code` (described below) and then splits it into shares using [Shamir's threshold secret sharing scheme](http://en.wikipedia.org/wiki/Shamir's_Secret_Sharing).

*shares* can later be combined together back into the `shareable_code` and decoded into the original seed mnemonic.

## shareable_code format:
### v1
```
<versionCode(8bitHex)><wordlistCode(8bitHex)><entropyLenghHex(8bitHex)><entropy(128-256bitHex)><checksum(32bitHex)>
```

## Installation

```
npm install shareable-seed --save
```

## Examples
``` js
const mnemonic = 'seed sock milk update focus rotate barely fade car face mechanic mercy'

// Split english mnemonic into 3 shares with 2 of them necessary for recovery
const shares = shareableSeed.mnemonicToShares(mnemonic, 3, 2, 'v1', 'english')
/* =>
{ '1': '801a17b2d8d79510c8238731868ca9a9df962b8f2388d787c5a1ca7bfc41e89b5cb1c6ba473b95c81d40900007f5adcf48b',
  '2': '8025ff65a07f2a2181973e530b0892927efc46df97007f0f8b43853639567192cdda119ad6ea34390d3cc5678acdc6e79f1',
  '3': '803fe8d778a8bf3149b4a9728f843b3ba16a6d50b488a8884ee24f4dc51bb695b24ca37aa655ebd9f258f6450165500022c' }
*/

const shareList = _.values(shares).slice(0, 2)

const recoveredMnemonic = shareableSeed.shareListToMnemonic(shareList)

console.log(recoveredMnemonic === mnemonic)
// => true

```
