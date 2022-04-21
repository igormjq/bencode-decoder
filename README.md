# B-Encode Parser

## Motivation
This is an implementation for a code challenge.

## Goal
The goal of this software is to accept input in [B-Encode](https://wiki.theory.org/BitTorrentSpecification#Bencoding) format, validate and decode it to a Javascript valid data type accordingly.

## Mapping structure
Each of the B-Encode input has a Javascript equivalent as the following:

| B-Encode | Javascript | Observation
| :--------------: | :---------: | :--------:|
| string | string | -
| integer | number | -
| dict | object | POJO with key-value pairs |
| list | object | Array object |

## How to run

```bash
$ npm start
```

## Running tests

```bash
$ npm run test
```

### Example inputs

```javascript
const strInput = '4:spam' // correspond to 'spam'
const integerInput = 'i5e' // correspond to 5
const simpleDict = 'd3:bar4:spam3:fooi42e4:messli1e1:cee';
const dictWithList = 'd3:barl4:spami42eei42e3:fooel3:barl4:spami42ee3:fooi42ee';
```
