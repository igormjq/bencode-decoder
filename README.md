# B-Encode Decoder

## Motivation
This project was first an implementation for a code challenge. Due to good feedbacks I decided to add this repo in order to improve the code and functionalities.
The implementation is strongly inspired by the [bencode](https://www.npmjs.com/package/bencode) package.

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
Feel free to use any version of Node.js since this project relies on [Babel](https://babeljs.io/) with the most recent preset.

1. Install dependencies

```
$ npm install
```

2. Start

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
