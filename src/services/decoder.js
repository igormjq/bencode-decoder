import { InputValidator } from "./bencode-input-validator";
import { 
  END_OF_TYPE,
  STRING_DELIMITER, 
} from '../shared/constants'

export class DecoderService {
  #position = 0;
  #bEncoded = null;

  #getChar(char) {
    let currentPosition = this.#position

    while (currentPosition < this.#bEncoded.length) {
      if (this.#bEncoded[currentPosition] === char) return currentPosition
      currentPosition++
    }
  }

  #stringDecoder() {
    let delimiter = this.#getChar(STRING_DELIMITER);
    const length = Number(this.#bEncoded[delimiter - 1]);
    const end = ++delimiter + length;

    this.#position = end; // set pointer to current position;

    return this.#bEncoded.slice(delimiter, end);
  }

  #integerDecoder() {
    const end = this.#getChar(END_OF_TYPE);
    const number = this.#bEncoded.slice(this.#position + 1, end) // remove 'i' and 'e'

    this.#position = end + 1;

    return Number(number) 
  }

  #listDecoder() {
    this.#position++; //set pointer to next char after 'l'

    const list = [];

    while(this.#bEncoded[this.#position] !== END_OF_TYPE) {
      list.push(this.#next());
    }

    this.#position++;

    return list;
  }

  #dictDecoder() {
    this.#position++;

    const result = {};

    while(this.#bEncoded[this.#position] !== END_OF_TYPE) {
      result[this.#stringDecoder()] = this.#next();
    }

    this.#position++;

    return result;
  }

  #next() {
    switch(this.#bEncoded[this.#position]) {
      case 'i':
        return this.#integerDecoder();
      case 'l':
        return this.#listDecoder();
      case 'd':
        return this.#dictDecoder();
      default:
        return this.#stringDecoder();
    }
  }
  
  decode(input) {
    this.#bEncoded = input;
    /**
     * validate before
     */

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