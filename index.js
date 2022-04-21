import { DecoderService } from "./src/services/decoder";

const input = 'li45e4:spam3:bbbe'
const validString = '4:rice';
const invalidInteger = 'i-01e'
const strInput = '4:spam' // correspond to 'spam'
const integerInput = 'i5e' // correspond to 5
const simpleDict = 'd3:bar4:spam3:fooi42e4:messli1e1:cee';
const dictWithList = 'd3:barl4:spami42eei42e3:fooel3:barl4:spami42ee3:fooi42ee';

const decoder = new DecoderService();

console.log('decoded', decoder.decode(input))
