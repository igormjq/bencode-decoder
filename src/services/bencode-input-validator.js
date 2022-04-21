import validator from 'bencode-validator';

export class InputValidator {
  validate(rawInput) {
    const input = Buffer.from(rawInput);
    const isInvalid = validator(input);
    if(Boolean(isInvalid)) throw new Error(`Invalid input: "${rawInput}"`);
  }
}