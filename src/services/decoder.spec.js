import { DecoderService } from '@services/decoder'
import { InputValidator } from '@services/bencode-input-validator'

describe('Services :: Decoder', () => {
  const makeSut = () => new DecoderService();

  beforeEach(() => jest.clearAllMocks())

  describe('#decode', () => {
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