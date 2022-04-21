import { DecoderService } from "./src/services/decoder";

const input = 'li45e4:spam3:bbbe'
const invalidList = 'li454:spam3:bbbe'
const validString = '4:rice';
const invalidString = '10:woops';
const invalidInteger = 'i-01e'

const decoder = new DecoderService();

console.log('decoded', decoder.decode(invalidInteger))
