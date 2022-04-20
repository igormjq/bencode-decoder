import { BEncodeDecoder } from "./src/services/bencode-decoder";

const input = 'd3:bar4:spam3:fooi42e4:messli1e1:cee';
const decoder = new BEncodeDecoder();

decoder.decode(input)