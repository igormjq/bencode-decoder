import validator from 'bencode-validator';

export class InputValidator {
  validate(input) {
    if(typeof input !== 'string') throw new Error('Input must be a string');
    const buffered = Buffer.from(input);
    const isValid = validator(buffered);
    if(Boolean(isValid)) throw new Error('Invalid input');

    return buffered;
  }
}