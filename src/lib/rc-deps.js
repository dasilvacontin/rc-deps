// I'm only covering cases and properties that I personally use. Feel free to
// file a PR that improves support.

const RC_FORMAT = {
  babel: {
    presets: 'preset',
    plugins: 'plugin'
  },
  eslint: {
    extends: 'config',
    parser: null,
    plugins: 'plugin'
  }
}

export function programForFilename (filename) {
  const match = /\.(.+)rc$/.exec(filename)
  return match ? match[1] : null
}

export function getDepNameWithProgramAndType (program, type, name) {
  // null indicates leave name as-is, e.g. for eslint parser
  if (type === null) return name
  const lead = `${program}-${type}-`
  name = name.replace(lead, '')
  return `${lead}${name}`
}

export function listDeps (filename, rc) {
  let deps = []

  const program = programForFilename(filename)
  if (!program) throw new Error('file is not an rc file')

  const rcConfig = RC_FORMAT[program]
  if (!rcConfig) throw new Error('unsupported rc file')

  for (var setting in rcConfig) {
    const type = rcConfig[setting]
    const value = rc[setting]

    const getDepName = name => getDepNameWithProgramAndType(program, type, name)
    if (Array.isArray(value)) deps.push.apply(deps, value.map(getDepName))
    else deps.push(getDepName(value))
  }

  return deps
}
