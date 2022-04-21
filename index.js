import { DecoderService } from "./src/services/decoder";

const input = 'li45e4:spam3:bbbe'

const decoder = new DecoderService();

console.log('decoded', decoder.decode(input))
