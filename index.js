import { InputValidator } from './src/services/bencode-input-validator'

const input = 'd3:bar4:spam3:fooi42e4:messli1e1:cee';

InputValidator.validate(input)