'use strict'

const { spawn } = require('child_process')

const copy = require('recursive-copy')
const path = require('path')

// Copy files from template to current folder
function copyTemplateFiles () {
  const src = path.resolve(__dirname, '../template')
  const dest = path.resolve('.')
  const options = {
    dot: true,
    overwrite: true
  }
  return copy(src, dest, options)
}

function spawnCommand (command, args, options) {
  return new Promise(function (resolve, reject) {
    const child = spawn(command, args, options)
    child.on('close', function (code) {
      if (code) {
        reject(new Error(`Failed to execute ${command}`))
        return
      }
      resolve()
    })
    child.on('error', reject)
  })
}

// Install dependencies
function installDependencies () {
  return spawnCommand('npm', ['install'])
}

// Initialize git repository
function initializeRepository () {
  return spawnCommand('git', ['init'])
}

/**
 * Create a new package from template.
 *
 * @returns {Promise} A promise that will resolve when the package is created.
 */
function run () {
  return copyTemplateFiles()
    .then(installDependencies)
    .then(initializeRepository)
}

module.exports = { run }
