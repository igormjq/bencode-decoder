import { InputValidator } from "./bencode-input-validator";

const INTEGER_START = 0x69 // 'i'
const STRING_DELIM = 0x3A // ':'
const DICTIONARY_START = 0x64 // 'd'
const LIST_START = 0x6C // 'l'
const END_OF_TYPE = 0x65 // 'e'

function getIntFromBuffer (data, start, end) {
  const PLUS_DECIMAL_CODE = 43; // '+'
  const MINUS_DECIMAL_CODE = 45; // '-'
  const PERIOD_DECIMAL_CODE = 46; // '.'
  const COLON_DECIMAL_CODE = 58 // ':'
  const ZERO_DECIMAL_CODE = 48 
  let sum = 0
  let sign = 1

  for (let i = start; i < end; i++) {
    const currentIntChar = data[i]

    if (currentIntChar < COLON_DECIMAL_CODE && currentIntChar >= ZERO_DECIMAL_CODE) {
      sum = sum * 10 + (currentIntChar - 48)
      continue
    }

    if (i === start && currentIntChar === PLUS_DECIMAL_CODE) continue

    if (i === start && currentIntChar === MINUS_DECIMAL_CODE) {
      sign = -1
      continue
    }
    
    // char is '.' which represents float
    if (currentIntChar === PERIOD_DECIMAL_CODE) break;
  }

  return sum * sign
}
export class BEncodeDecoder {
  #validator;
  #bytes;
  #position;
  #data;

  constructor() {
    this.#validator = new InputValidator();
    this.#bytes = 0;
    this.#position = 0;
    this.#data = null;
  }

  #findChar(char) {
    let currentPosition = this.#position

    while (currentPosition < this.#data.length) {
      if (this.#data[currentPosition] === char) return currentPosition
      currentPosition++
    }
  }
  
  #string() {
    let separator = this.#findChar(STRING_DELIM);

    const length = getIntFromBuffer(this.#data, this.#position, separator);
    const end = ++separator + length

    // update position
    this.#position = end

    // slices off iterated char
    return this.#data.slice(separator, end)
  }

  #next() {
    const dataResolver = {
      default: this.#string(),
    };

    return dataResolver[this.#position] ?? dataResolver.default;
  }

  #setData(data) {
    this.#data = Buffer.from(data);
  }

  #setBytes(bytes) {
    this.#bytes = bytes;
  }

  decode(rawInput) {
    // bufferize input
    const input = Buffer.from(rawInput)
    
    // validate if B-encode follows correct format (lib)
    this.#validator.validate(input);
    // set data to be iterated and decoded
    this.#setData(input);
    // store data initial length
    this.#setBytes(this.#data.length)

    return this.#next();
  }
}