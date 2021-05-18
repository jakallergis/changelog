import cp from 'child_process'
import invariant from './invariant'
import semver from 'semver/preload'

const CURRENT_TAG_CMD = 'git describe --tags --abbrev=0'

export default function getTagVersion(): string {
  const version = cp
    .execSync(CURRENT_TAG_CMD)
    .toString('utf-8')
    .replace('\n', '')
  invariant(
    semver.valid(version),
    `Tag version ${version} is not a valid semver version`
  )
  return version || 'v0.0.0'
}
