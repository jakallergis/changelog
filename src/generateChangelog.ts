import getGitCommits from './utils/getGitCommits'
import {extractCurrentChangelog} from './utils/extractCurrentChangelog'
import formatUnicorn from './utils/formatUnicorn'

export interface IChangelogContext {
  repo: string
  owner: string
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
