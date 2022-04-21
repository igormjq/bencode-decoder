import { InputValidator } from "./bencode-input-validator";
import { 
  END_OF_TYPE,
  STRING_DELIMITER, 
} from '../shared/hexadecimal-codes'

export class DecoderService {
  #position = 0;
  #fullLength = 0;
  #bEncoded = null;

  #getChar(char) {
    let currentPosition = this.#position

    while (currentPosition < this.#bEncoded.length) {
      if (this.#bEncoded[currentPosition] === char) return currentPosition
      currentPosition++
    }
  }

  #stringDecoder() {
    let delimiter = this.#getChar(':');
    const length = Number(this.#bEncoded[delimiter - 1]);
    const end = ++delimiter + length;

    this.#position = end; // set pointer to current position;

    return this.#bEncoded.slice(delimiter, end);
  }

  #integerDecoder() {
    // i99e -> 99
    const end = this.#getChar('e');
    const number = this.#bEncoded.slice(this.#position + 1, end) // remove 'i' and 'e'

    this.#position = end + 1;

    return Number(number) 
  }
  
  #next() {
    switch(this.#bEncoded[this.#position]) {
      case 'i':
        return this.#integerDecoder();
      default:
        return this.#stringDecoder();
    }
  }
  
  decode(input) {
    this.#bEncoded = input;
    // const isString = new RegExp(/^[1-9]:\D+/, 'g').test(input);
    // if(isString) return this.#stringDecoder(input)

    // const isInteger = new RegExp(/^i(-?)[1-9]\d+e/, 'g').test(input);
    // if(isInteger) return this.#integerDecoder(input)

    // const isList = new RegExp(/^l(i(-?)[1-9]\d*e)+e/, 'g').test(input);
    // if(isList) {
    //   this.#data = input;
    //   return this.#listDecoder()
    // }

    return this.#next();
  }
}