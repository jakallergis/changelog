import formatUnicorn from './formatUnicorn'
import cp from 'child_process'

const LAST_TWO_TAGS_CMD = 'git tag --sort=-version:refname | head -n {count}'

export default function getTagsRange(count = 2): string {
  const command = formatUnicorn(LAST_TWO_TAGS_CMD, {count})
  const tags = cp
    .execSync(command)
    .toString('utf-8')
    .split('\n')
    .filter(Boolean)
  const mostRecentTag = tags[0]
  const oldestTag = tags[tags.length - 1]
  if (!mostRecentTag && !oldestTag) return ''
  if (mostRecentTag === oldestTag) return `${mostRecentTag}..HEAD`
  if (mostRecentTag && oldestTag) return `${oldestTag}..${mostRecentTag}`
  return ''
}
