import { InputValidator } from "./bencode-input-validator";

export class BEncodeDecoder {
  #validator;

  constructor() {
    this.#validator = new InputValidator();
  }

  decode(input) {
    this.#validator.validate(input);
  }
}