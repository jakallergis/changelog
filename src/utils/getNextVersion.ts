import semver, {ReleaseType} from 'semver'
import invariant from './invariant'

export default function getNextVersion(
  version: string,
  type: ReleaseType
): string {
  invariant(
    semver.valid(version),
    `Can't determine next version because the current version passed is not valid [${version}]`
  )
  return semver.inc(version, type) || version
}
