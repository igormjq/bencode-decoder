import validator from 'bencode-validator';

export class InputValidator {
  validate(input) {
    const isInvalid = validator(input);
    if(Boolean(isInvalid)) throw new Error('Invalid input');
  }
}