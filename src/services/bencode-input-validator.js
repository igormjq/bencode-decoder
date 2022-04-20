import validator from 'bencode-validator';

export class InputValidator {
  validate(input) {
    if(typeof input !== 'string') throw new Error('Input must be a string');
    const isValid = validator(Buffer.from(input));
    if(Boolean(isValid)) throw new Error('Invalid input');
  }
}