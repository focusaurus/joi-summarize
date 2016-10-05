'use strict'

const joi = require('joi')
const summarize = require('..')
const tap = require('tap')

tap.test('with an error object', function (test) {
  test.same(
    summarize({details: null}),
    'Invalid input.\n',
    'should handle details null'
  )
  test.same(
    summarize({details: []}),
    'Invalid input.\n',
    'should handle details empty array'
  )
  test.same(
    summarize({details: [{message: '"foo" must be 2'}]}),
    'Invalid input.\n"foo" must be 2.\n',
    'should handle one error'
  )
  test.same(
    summarize({details: [
        {message: '"foo" must be 2'},
        {message: '"bar" must be baz'}
    ]}),
    'Invalid input.\n"foo" must be 2.\n"bar" must be baz.\n',
    'should handle two errors'
  )
  test.same(
    summarize({details: [
        {message: '"foo" must be 2'},
        {message: '"bar" must be baz'}
    ]}, 'Unit Test Error'),
    'Unit Test Error.\n"foo" must be 2.\n"bar" must be baz.\n',
    'should allow override summary'
  )
  test.end()
})

tap.test('with missing joi error', (test) => {
  test.same(summarize(), void 0, 'undefined input returns undefined')
  test.same(summarize(null), void 0, 'null input returns undefined')
  test.end()
})

tap.test('with incorrect type', (test) => {
  test.throws(() => summarize(42), TypeError, 'Number input should throw TypeErrror')
  test.throws(() => summarize(false), TypeError, 'Boolean input should throw TypeErrror')
  test.end()
})

tap.test('with single real joi error', (test) => {
  test.same(
    summarize(joi.boolean().validate(42).error, 'Georges Bool'),
    'Georges Bool.\n"value" must be a boolean.\n')
  test.end()
})

tap.test('with compound joi error', (test) => {
  const result = joi.object().keys({
    age: joi.number().integer().min(0),
    name: joi.string()
  }).validate({age: -2, name: 42}, {abortEarly: false})
  test.same(
    summarize(result.error, 'Compound'),
    'Compound.\n"age" must be larger than or equal to 0.\n"name" must be a string.\n')
  test.end()
})
