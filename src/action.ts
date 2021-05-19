import * as core from '@actions/core'
import * as github from '@actions/github'
import getTagsRange from './utils/getTagsRange'
import getTagVersion from './utils/getTagVersion'
import generateChangelog, {IChangelogContext} from './utils/generateChangelog'
import getHasVersionTagOnHEAD from './utils/getHasVersionTagOnHEAD'
import setEvnVar from './utils/setEvnVar'

/**
 * This is the code that the Github Action will run.
 * Because we won't have access to the main project's
 * code at the time of the creation, we will be getting
 * our version numbers strictly from the git tags.
 * TODO: See if I can access the actual project's
 *       package.json from when this runs as an
 *       action in Github
 */
async function action(): Promise<void> {
  try {
    const hasVersionTagOnHEAD = getHasVersionTagOnHEAD()
    core.setOutput('hasVersionTagOnHEAD', hasVersionTagOnHEAD)
    const checkForSkip = core.getInput('skipIfNoVersionTagOnHEAD') === 'true'
    if (checkForSkip && !hasVersionTagOnHEAD) {
      core.info('Action is skipped because HEAD does not include a version tag')
      return
    }
    const serverUrl = github.context.serverUrl
    if (!process.env['GITHUB_REPOSITORY']) {
      process.env['GITHUB_REPOSITORY'] = 'jakallergis/changelog-generator'
    }
    const {repo, owner} = github.context.repo || {}
    const commitUrl = `${serverUrl}/${owner}/${repo}/commit`
    const version = getTagVersion()
    const tags = getTagsRange(2)
    const format = 'slack'
    const ctx = {commitUrl, version, tags, format} as IChangelogContext
    const newChangelog = await generateChangelog(ctx)
    setEvnVar('VERSION_CHANGELOG', newChangelog)
    core.setOutput('changelog', newChangelog)
  } catch (error) {
    console.log({error})
    core.setFailed(error.message)
    process.stderr.write(error.message)
  }
}

void action()
