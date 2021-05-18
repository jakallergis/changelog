import cp from 'child_process'
import ICommit from '../models/ICommit'
import {CommitTypes} from '../models/CommitTypes'
import {CommitScopes} from '../models/CommitScopes'

const DEL = '----DELIMITER----'
const END = '----END_COMMIT----'
const CMD = `git log --format='%s${DEL}%b${DEL}%H${DEL}%h${END}' --no-merges`

export default function getGitCommits(tagsRange: string): ICommit[] {
  const COMMITS_CMD = `${CMD} ${tagsRange}`
  const output = cp.execSync(COMMITS_CMD).toString('utf-8')

  return output
    .split(`${END}\n`)
    .map(commit => {
      const sections = commit.split(DEL) || []
      const messageSection = sections[0]
      const bodySection = sections[1]
      const sha = sections[2]
      const shaShort = sections[3]

      const mSplit = messageSection?.split(': ')
      const typeSection = mSplit.length > 1 ? mSplit[0] : CommitTypes.CHORE
      const scope = typeSection.match(/\((.+)\)$/)?.[1]
      const type = scope ? typeSection.replace(/\(.+\)$/, '') : typeSection
      const message = (mSplit.length > 1 ? mSplit[1] : mSplit[0]) || '-'

      const body =
        bodySection
          ?.split('\n')
          .filter(Boolean)
          .map(b => b.replace(/^- /, '')) || []

      return {
        message,
        body,
        sha,
        shaShort,
        type: type as CommitTypes,
        scope: scope as CommitScopes
      }
    })
    .filter(c => Boolean(c.sha))
}
