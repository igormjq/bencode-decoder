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

### Example

```javascript
const strInput = '4:spam' // correspond to 'spam'
const integerInput = 'i5e' // correspond to 5
```