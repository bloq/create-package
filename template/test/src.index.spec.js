'use strict'

// eslint-disable-next-line
const chai = require('chai')

chai.should()

const packageName = require('..')

describe('Package', function() {
  it('should exist', function() {
    packageName.should.exist
  })
})
