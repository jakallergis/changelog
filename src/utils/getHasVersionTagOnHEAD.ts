import semver from 'semver'
import formatUnicorn from './formatUnicorn'
import cp from 'child_process'

const CMD = 'git tag --points-at HEAD'

export default function getHasVersionTagOnHEAD(): boolean {
  const command = formatUnicorn(CMD)
  const tag = cp.execSync(command).toString('utf-8')
  return !!semver.valid(tag)
}
