import semver, {ReleaseType} from 'semver'
import {version} from '../../package.json'

export default function getNextVersion(type: ReleaseType): string {
  return semver.inc(version, type) || version
}
