import assert = require('assert')
import Log from '../../../src/shared/log'

describe('log', function () {
  it('should say hello', function () {
    let name = 'Dev'
    let result = Log.hello(name)
    assert.equal(result, `Hello ${name}`)
  })
})
