import getGitCommits from './getGitCommits'
import {extractCurrentChangelog} from './extractCurrentChangelog'
import formatUnicorn from './formatUnicorn'

export interface IChangelogContext {
  commitUrl: string
  version: string
  tags: string
}

export default async function generateChangelog(
  ctx: IChangelogContext
): Promise<string> {
  const commits = getGitCommits(ctx.tags)
  if (!commits.length) return ''
  const newChangelog = extractCurrentChangelog(commits, ctx.version)
  return formatUnicorn(newChangelog, ctx)
}