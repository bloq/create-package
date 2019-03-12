#!/usr/bin/env node

'use strict'

const initializer = require('../src')

initializer.run()
  .then(function () {
    console.log('Package created')
  })
  .catch(function (err) {
    console.error('Failed to create package: %s', err.message)
  })
