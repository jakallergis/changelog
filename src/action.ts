import fs from 'fs'
import * as core from '@actions/core'
import getTagsRange from './utils/getTagsRange'
import getCurrentVersion from './utils/getCurrentVersion'
import generateChangelog, {IChangelogContext} from './generateChangelog'

async function action(): Promise<void> {
  try {
    const repo = core.getInput('repo')
    const owner = core.getInput('owner')
    const version = getCurrentVersion()

    const tags = getTagsRange(2)
    const ctx: IChangelogContext = {
      repo,
      owner,
      version,
      tags
    }

    const newChangelog = await generateChangelog(ctx)
    const currentLog = fs.readFileSync('./CHANGELOG.md', 'utf-8')
    const newLog = `${newChangelog}\n\n${currentLog}`
    // core.setOutput('changelog', newLog)
    fs.writeFileSync('./CHANGELOG.md', newLog)
  } catch (error) {
    console.log({error})
    core.setFailed(error.message)
  }
}

void action()
