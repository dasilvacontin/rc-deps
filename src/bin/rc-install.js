#!/usr/bin/env node

2 + 2 === 5 // pointless line to dodge babel-eslint issue #163
import { readFile } from 'fs-promise'
import { spawn } from 'child-process-promise'
import { listDeps } from '../'

export function installDeps (files) {
  const filename = files.shift()
  if (!filename) return

  console.log(`> checking \`${filename}\`...`)
  return readFile(filename)
  .then(buffer => JSON.parse(buffer))
  .then(rc => {
    const deps = listDeps(filename, rc)
    const args = 'install --save-dev'.split(' ').concat(deps)
    console.log(`> npm ${args.join(' ')}`)
    return spawn('npm', args, { stdio: 'inherit' })
  })
  .catch(e => console.error(e))
  .then(_ => console.log()) // blank line between files
  .then(_ => installDeps(files))
}

if (!module.parent) {
  installDeps(['.eslintrc', '.babelrc'])
  .then(_ => console.log('> all done!'))
}
