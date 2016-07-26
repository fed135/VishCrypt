/**
 * Vi$hCrypt v1.0.0 - vish4crypt@biz.gov.net
 * $$$
 */

'use strict';

/* Local variables -----------------------------------------------------------*/

const BYTESIZE = 8;
const ZERO_PAD = '00000000';
const NOTHING = '';
const ZERO = '0';
const ONE = '1';
const VISH_ZERO = 'o';
const VISH_ONE = 'l';
const ALPHABET_SIZE = 255;

/* Methods -------------------------------------------------------------------*/

class Vi$hCrypt {
  static encrypt(str) {
    return Array.from(str)
      .map(Vi$hCrypt.prototype._toPoint)
      .map(Vi$hCrypt.prototype._rot)
      .map(Vi$hCrypt.prototype._toBinary)
      .map(Vi$hCrypt.prototype._toLOL)
      .join(NOTHING);
  }

  static decrypt(str) {
    return Array.from(str)
      .map(Vi$hCrypt.prototype._fromLOL)
      .reduce(Vi$hCrypt.prototype._groupBinaries, [])
      .map(Vi$hCrypt.prototype._fromBinary)
      .map(Vi$hCrypt.prototype._unrot)
      .map(Vi$hCrypt.prototype._fromPoint)
      .join(NOTHING);
  }

  _toPoint(char) {
    return String(char).codePointAt(0);
  }

  _fromPoint(point) {
    return String.fromCodePoint(point);
  }

  _rot(char, i) {
    let next = (char + i)%ALPHABET_SIZE;
    console.log('rot ', char, ' -> ', next);

    return next;
  }

  _unrot(char, i) {
    let next = ((char - 2) - i)%ALPHABET_SIZE;
    console.log('unrot ', char, ' -> ', next);
    if (next < 0) next = ALPHABET_SIZE + next;

    return next;
  }

  _toBinary(char) {
    return Vi$hCrypt.prototype._zeroPad(char.toString(2));
  }

  _groupBinaries(res, char) {
    if (res.length === 0) res.push(char);
    else {
      let index = res.length - 1;

      if (res[index].length < BYTESIZE) {
        res[index] += char;
      }
      else {
        res.push(char);
      }
    }

    return res;
  }

  _fromBinary(chars) {
    return parseInt(chars, 2);
  }

  _zeroPad(num) {
    return ZERO_PAD.slice(String(num).length) + num;
  }

  _toLOL(char) {
    return (char === ZERO)?VISH_ZERO:(char === ONE)?VISH_ONE:NOTHING;
  }

  _fromLOL(char) {
    return (char === VISH_ZERO)?ZERO:(char === VISH_ONE)?ONE:NOTHING;
  }
}

/* Exports -------------------------------------------------------------------*/

module.exports = Vi$hCrypt;