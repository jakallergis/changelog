import cp from 'child_process'
import formatUnicorn from './formatUnicorn'

const CMD = 'echo "{key}={value}" >> $GITHUB_ENV'

export default function setEvnVar(key: string, value: string): boolean {
  try {
    const escapedValue = value.replace('"', '\\"')
    const command = formatUnicorn(CMD, {key, value: escapedValue})
    cp.execSync(command).toString('utf-8')
    return true
  } catch (error) {
    console.log({error})
    process.stderr.write(error.message)
    return false
  }
}
