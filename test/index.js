import test from 'tape'
import { programForFilename, listDeps } from '../src/lib/rc-deps.js'

test('programForFilename', function (t) {
  t.equal(programForFilename('.babelrc'), 'babel')
  t.equal(programForFilename('.eslintrc'), 'eslint')
  t.end()
})

test('listDeps - eslintrc', function (t) {
  const eslintrc = {
    'parser': 'babel-eslint',
    'plugins': [
      'flow-vars',
      'myplugin'
    ],
    'extends': [
      'standard',
      'eslint-config-standard-react',
      'standard-jsx'
    ]
  }

  const actualDeps = listDeps('.eslintrc', eslintrc)
  const expectedDeps = [
    'babel-eslint',
    'eslint-plugin-flow-vars',
    'eslint-plugin-myplugin',
    'eslint-config-standard',
    'eslint-config-standard-react',
    'eslint-config-standard-jsx'
  ]

  t.deepEqual(actualDeps.sort(), expectedDeps.sort(),
    'it should correctly list eslint dependencies')
  t.end()
})

test('listDeps - babelrc', function (t) {
  const babelrc = {
    'presets': [
      'es2015',
      'stage-0'
    ],
    'plugins': [
      'add-module-exports',
      'syntax-flow',
      'transform-flow-strip-types',
      'typecheck',
      'transform-strict-mode'
    ]
  }

  const actualDeps = listDeps('.babelrc', babelrc)
  const expectedDeps = [
    'babel-preset-es2015',
    'babel-preset-stage-0',
    'babel-plugin-add-module-exports',
    'babel-plugin-syntax-flow',
    'babel-plugin-transform-flow-strip-types',
    'babel-plugin-typecheck',
    'babel-plugin-transform-strict-mode'
  ]

  t.deepEqual(actualDeps.sort(), expectedDeps.sort(),
    'it should correctly list babel dependencies')
  t.end()
})

test('listDeps - not a .*rc file', function (t)  {
  t.throws(_ => listDeps('package.json'), /not an rc file/, 'should throw')
  t.end()
})

test('listDeps - unsupported rc file', function (t)  {
  t.throws(_ => listDeps('.mocharc'), /unsupported rc/, 'should throw')
  t.end()
})
