import ICommit from '../models/ICommit'
import {CommitTypes} from '../models/CommitTypes'
import {CommitScopes} from '../models/CommitScopes'
import formatUnicorn from './formatUnicorn'

class Formatter {
  headerTemplate = '# {text}\n\n'
  subHeaderTemplate = '### {text}\n'
  scopeTemplate = '**[${scope}]**'
  linkTemplate = '[{text}]({url})'

  formatCommit(commit: ICommit): string {
    const {message, type} = commit
    const link = this.getCommitLink(commit)
    const scope = this.getCommitScope(commit)
    const formattedBody = this.getCommitBody(commit)
    let formattedText = `- ${scope}${message} (${link})`
    if ([CommitTypes.FEATURE, CommitTypes.FIX].includes(type)) {
      formattedText = `${formattedText}${formattedBody}`
    }
    return formattedText
  }

  formatVersionTitle(version: string): string {
    const date = new Date().toISOString().split('T')[0]
    return this.getHeader(`Version ${version} (${date})`)
  }

  formatSectionList(title: string, items: string[]): string {
    if (!(title || items.length)) return ''
    let string = this.getSubHeader(title)
    string += items.join('\n')
    string += '\n\n'
    return string
  }

  /** Getters / Setters */

  getHeader(text?: string): string {
    if (!text) return ''
    return formatUnicorn(this.headerTemplate, {text})
  }

  getSubHeader(text?: string): string {
    if (!text) return ''
    return formatUnicorn(this.subHeaderTemplate, {text})
  }

  getCommitLink(commit: ICommit): string {
    if (!(commit?.sha && commit?.shaShort)) return ''
    const text = commit.shaShort
    const url = `{commitUrl}/${commit.sha}`
    return formatUnicorn(this.linkTemplate, {text, url})
  }

  getCommitScope(commit: ICommit): string {
    if (!commit?.scope) return ''
    const string = formatUnicorn(this.scopeTemplate, {scope: commit.scope})
    return `${string} `
  }

  getCommitBody(commit: ICommit): string {
    if (!commit?.body?.length) return ''
    return `\n  - ${commit.body.join('\n  - ')}`
  }
}

class SlackFormatter extends Formatter {
  headerTemplate = '*{text}*\n\n'
  subHeaderTemplate = '*{text}*\n'
  scopeTemplate = '*[${scope}]*'
  linkTemplate = '<{text}|{url}>'
}

const formatters = {
  slack: new SlackFormatter(),
  markdown: new Formatter()
}

export function extractCurrentChangelog(
  commits: ICommit[],
  version: string,
  format: 'slack' | 'markdown' = 'markdown'
): string {
  const formatter = formatters[format] || formatters.markdown
  let newChangelog = formatter.formatVersionTitle(version)
  if (commits?.length) {
    const features: string[] = []
    const fixes: string[] = []
    const chores: string[] = []
    const deps: string[] = []
    for (const commit of commits) {
      const formattedText = formatter.formatCommit(commit)
      if (commit.type === CommitTypes.CHORE) {
        const isDep = commit.scope === CommitScopes.DEPS
        const isDepDev = commit.scope === CommitScopes.DEPS_DEV
        if (isDep || isDepDev) {
          deps.push(formattedText)
        } else {
          chores.push(formattedText)
        }
        continue
      }
      if (commit.type === CommitTypes.FEATURE) features.push(formattedText)
      if (commit.type === CommitTypes.FIX) fixes.push(formattedText)
    }
    newChangelog += formatter.formatSectionList('Features', features)
    newChangelog += formatter.formatSectionList('Fixes', fixes)
    newChangelog += formatter.formatSectionList('Chores', chores)
    newChangelog += formatter.formatSectionList('Changed Dependencies', deps)
  }
  return newChangelog
}
