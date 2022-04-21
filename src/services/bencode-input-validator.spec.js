import validator from 'bencode-validator'
import { InputValidator } from '@services/bencode-input-validator'

jest.mock('bencode-validator');
validator.mockImplementation(() => false)

describe('Services ::InputValidator', () => {
  const makeSut = () => new InputValidator();

  beforeEach(() => jest.restoreAllMocks());

  test('should call validator lib with correct input', () => {
    const inputValidator = makeSut();

    inputValidator.validate('i10e');
    expect(validator).toHaveBeenCalledWith(Buffer.from('i10e'))
  })

  test('should throw when invalid input', () => {
    const inputValidator = makeSut();

    validator.mockImplementationOnce(() => true)

    expect(() => inputValidator.validate('i10e')).toThrow(`Invalid input: "i10e"`);
  })
})