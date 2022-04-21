import { DecoderService } from '@services/decoder'
import { InputValidator } from '@services/bencode-input-validator'

describe('Services :: Decoder', () => {
  const makeSut = () => {
    jest.spyOn(InputValidator.prototype, 'validate')
      .mockImplementationOnce(() => true)
    return new DecoderService();
  }

  beforeEach(() => jest.clearAllMocks())

  describe('#decode', () => {
    it('test', () => {
      const decoder = makeSut();
      decoder.decode('any');
    })
    it('should call InputValidator with correct values', () => {
      const decoder = makeSut();
      const spyOnValidator = jest.spyOn(InputValidator.prototype, 'validate');

      decoder.decode('3:iso');
      expect(spyOnValidator).toHaveBeenCalledWith('3:iso');
    })
    it('should throw when InputValidator throws', () => {
      jest.spyOn(InputValidator.prototype, 'validate')
        .mockImplementationOnce(() => {
          throw new Error('Any error')
        })
      const decoder = makeSut();

      expect(() => decoder.decode('2incorret')).toThrow();
    })
  })
})