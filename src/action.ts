import fs from 'fs'
import * as core from '@actions/core'
import getTagsRange from './utils/getTagsRange'
import getCurrentVersion from './utils/getCurrentVersion'
import generateChangelog, {IChangelogContext} from './generateChangelog'
import getHasVersionTagOnHEAD from './utils/getHasVersionTagOnHEAD'

async function action(): Promise<void> {
  try {
    const hasVersionTagOnHEAD = getHasVersionTagOnHEAD()
    console.log({hasVersionTagOnHEAD})
    core.setOutput('hasVersionTagOnHEAD', hasVersionTagOnHEAD)
    const checkForSkip = core.getInput('skipIfNoVersionTagOnHEAD') === 'true'
    if (checkForSkip && !hasVersionTagOnHEAD) {
      core.info('Action is skipped because HEAD does not include a version tag')
      return
    }
    const repo = core.getInput('repo')
    const owner = core.getInput('owner')
    const version = getCurrentVersion()
    const tags = getTagsRange(2)
    const ctx = {repo, owner, version, tags} as IChangelogContext
    const newChangelog = await generateChangelog(ctx)
    const currentLog = fs.readFileSync('./CHANGELOG.md', 'utf-8')
    const newLog = `${newChangelog}\n\n${currentLog}`
    core.setOutput('changelog', newLog)
  } catch (error) {
    console.log({error})
    core.setFailed(error.message)
  }
}

void action()
