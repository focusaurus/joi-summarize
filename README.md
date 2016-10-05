# joi summarize

Combine error messages from a joi error into a summary string.

- Designed to work with joi `result.error` objects created with joi's `abortEarly: false` option

## How to Install

`npm install --save joi-summarize`

## How to Use in node.js

```js
'use strict'
const joi = require('joi')
const summarize = require('joi-summarize')

const badInput = {
  age: -2,
  name: 42
}
const schema = joi.object().keys({
  age: joi.number().integer().min(0),
  name: joi.string()
})
const result = schema.validate(badInput, {abortEarly: false})
console.log(summarize(result.error))
/* That will log:
Invalid input.
"age" must be larger than or equal to 0.
"name" must be a string.
*/


// To customize the first line message, pass as 2nd argument
console.log(summarize(result.error, 'Unacceptable data'))
/* That will log:
Unacceptable data.
"age" must be larger than or equal to 0.
"name" must be a string.
*/
```

# Invalid arguments

- If you call `summarize` with `null` or `undefined`, it returns `undefined`
- If you call `summarize` with any other non-object, it throws a `TypeError`

# How to Run Tests

- **Initial setup**
  - git clone this repository
  - `npm install`
- `npm run test` runs unit tests, coverage checks, eslint
- `npm run test-unit` runs unit tests only
- `npm run coverage` runs nyc/istanbul code coverage and opens the report
- `npm run lint` runs eslint static analysis

## Stinking Badges
![](https://img.shields.io/npm/v/joi-summarize.svg)
[![npm](https://img.shields.io/npm/l/joi-summarize.svg?maxAge=2592000)]()
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

# License: MIT

See [license.txt]()
