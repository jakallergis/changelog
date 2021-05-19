import cp from 'child_process'
import formatUnicorn from './formatUnicorn'

const CMD = 'echo "{key}={value}" >> $GITHUB_ENV'

export default function setEvnVar(key: string, value: string): void {
  const escapedValue = value.replace('"', '\\"')
  const command = formatUnicorn(CMD, {key, value: escapedValue})
  cp.execSync(command).toString('utf-8')
}
