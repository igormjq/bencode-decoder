import { InputValidator } from "./bencode-input-validator";
import { 
  DICT_START,
  END_OF_TYPE,
  INTEGER_START,
  LIST_START,
  STRING_DELIMITER, 
} from '../shared/constants'

export class DecoderService {
  #position = 0;
  #bEncoded = null;
  #validator;

  constructor() {
    this.#validator = new InputValidator();
  }

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
    
    return this.#bEncoded.slice(delimiter, end)
  }

  #integerDecoder() {
    try {
      
    } catch(error) {

    }
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
      case INTEGER_START:
        return this.#integerDecoder();
      case LIST_START:
        return this.#listDecoder();
      case DICT_START:
        return this.#dictDecoder();
      default:
        return this.#stringDecoder();
    }
  }
  
  decode(input) {
    this.#validator.validate(input);
    this.#bEncoded = input;

    return this.#next();
  }
}