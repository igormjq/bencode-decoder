import { InputValidator } from "./bencode-input-validator";
import { 
  STRING_DELIMITER, 
} from '../shared/hexadecimal-codes'

export class DecoderService { 
  #stringDecoder(token) {
    const [, str] = token.split(STRING_DELIMITER)[1];
    return str;
  }

  #integerDecoder(token) {
    return Number(token.slice(1, -1)) // remove 'i' and 'e'
  }
  
  decode(input) {
    const isString = new RegExp(/^[1-9]:\D+/, 'g').test(input);
    if(isString) return this.#stringDecoder(input)

    const isInteger = new RegExp(/^i(-?)[1-9]\d+e/, 'g').test(input);
    if(isInteger) return this.#integerDecoder(input)
  }
}