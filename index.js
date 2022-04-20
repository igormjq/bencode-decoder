import { BEncodeDecoder } from "./src/services/bencode-decoder";

const input = '4:spam'
const decoder = new BEncodeDecoder();

console.log(decoder.decode(input).toString());