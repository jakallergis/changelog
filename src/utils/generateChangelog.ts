import getGitCommits from './getGitCommits'
import {extractCurrentChangelog} from './extractCurrentChangelog'
import formatUnicorn from './formatUnicorn'

export interface IChangelogContext {
  commitUrl: string
  version: string
  tags: string
  format?: 'slack' | 'markdown'
}

export default async function generateChangelog(
  ctx: IChangelogContext
): Promise<string> {
  const commits = getGitCommits(ctx.tags)
  if (!commits.length) return ''
  const newChangelog = extractCurrentChangelog(commits, ctx.version, ctx.format)
  return formatUnicorn(newChangelog, ctx)
}
