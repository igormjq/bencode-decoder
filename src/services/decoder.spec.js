import { DecoderService } from '@services/decoder'
import { InputValidator } from '@services/bencode-input-validator'

describe('Services :: Decoder', () => {
  const makeSut = (mockValidator= true) => {
    if(mockValidator) {
      jest.spyOn(InputValidator.prototype, 'validate')
        .mockImplementationOnce(() => true)
    }
    return new DecoderService();
  }

  afterEach(() => jest.restoreAllMocks())

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

    it('should decode bencoded string correctly', () => {
      const decoder = makeSut();
      const input = '4:spam';
      const expected = 'spam';

      const result = decoder.decode(input);

      expect(result).toEqual(expected)
    })

    describe('#integer', () => {
      it('should decode bencoded positive integer correctly', () => {
        const decoder = makeSut();
        const input = 'i123e';
        const expected = 123;
  
        const result = decoder.decode(input);
  
        expect(result).toEqual(expected)
        expect(typeof result).toBe('number')
      })
  
      it('should decode bencoded negative integer correctly', () => {
        const decoder = makeSut();
        const input = 'i-10e';
        const expected = -10;
  
        const result = decoder.decode(input);
  
        expect(result).toEqual(expected);
      })

      describe('When invalid integer input', () => {
        it('should fail for invalid bencoded integer', () => {
          const decoder = makeSut(false);
          const withLeadingZero = 'i01e';
    
          expect(() => decoder.decode(withLeadingZero)).toThrow();
        })
        it('should fail for invalid bencoded integer', () => {
          const decoder = makeSut(false);
          const missingEndOfType = 'i1';
    
          expect(() => decoder.decode(missingEndOfType)).toThrow();
        })
        it('should fail for invalid bencoded integer', () => {
          const decoder = makeSut(false);
          const missingStartOfChar = '1e';
  
          expect(() => decoder.decode(missingStartOfChar)).toThrow();
        })
      })
    })

    describe('#list', () => {
      it('should decode bencoded list correctly', () => {
        const decoder = makeSut(false);
        const input = 'li6e4:test3:rune';
        const expected = [6, 'test', 'run'];
        
        expect(decoder.decode(input)).toEqual(expected)
      })
      it('should parse nested list', () => {
        const decoder = makeSut(false);
        const input = 'li1eli2ei3eee'
        const expected = [1, [2,3]]

        expect(decoder.decode(input)).toEqual(expected)
      })
      
      describe('When invalid list input', () => {
        it('should fail for invalid bencoded list', () => {
          const decoder = makeSut(false);
          const missingEndOfType = 'li666e';
          
          expect(() => decoder.decode(missingEndOfType)).toThrow();
        })
      })
    })
  })
})