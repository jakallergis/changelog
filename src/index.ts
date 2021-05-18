import fs from 'fs'
import * as github from '@actions/github'
import {ReleaseType} from 'semver'
import {VersionTypes} from './models/VersionTypes'
import invariant from './utils/invariant'
import getNextVersion from './utils/getNextVersion'
import getPackageJSON from './utils/getPackageJSON'
import generateChangelog, {IChangelogContext} from './utils/generateChangelog'

async function main(): Promise<void> {
  try {
    const type = process.argv.slice(2)[0] as ReleaseType
    const isValidType = VersionTypes.includes(type)
    invariant(
      isValidType,
      `Version type [${type}] is not compatible. Please use one of ${VersionTypes}`
    )
    const packageJSON = getPackageJSON()
    const serverUrl = github.context.serverUrl
    if (!process.env['GITHUB_REPOSITORY']) {
      process.env['GITHUB_REPOSITORY'] = packageJSON.repository
    }
    const {repo, owner} = github.context.repo || {}
    const commitUrl = `${serverUrl}/${owner}/${repo}/commit`
    const tagVersion = `v${packageJSON.version}`
    const version = getNextVersion(tagVersion, type)
    const tags = `${tagVersion}..HEAD`
    const ctx = {commitUrl, version, tags} as IChangelogContext
    const newChangelog = await generateChangelog(ctx)
    if (newChangelog) {
      const currentLog = fs.readFileSync('./CHANGELOG.md', 'utf-8')
      fs.writeFileSync('./CHANGELOG.md', `${newChangelog}\n\n${currentLog}`)
    }
  } catch (error) {
    console.log({error})
    process.stderr.write(error.message)
  }
}

void main()
