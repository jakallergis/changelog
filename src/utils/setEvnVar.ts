import fs from 'fs'
import cp from 'child_process'
import formatUnicorn from './formatUnicorn'

const CMD = `body=$(cat ./temp)
body="\${body//'%'/'%25'}"
body="\${body//$'\n'/'%0A'}"
body="\${body//$'\r'/'%0D'}"
echo "::set-env name={key}::$body"
`

export default function setEvnVar(key: string, value: string): boolean {
  try {
    fs.writeFileSync('./temp', value)
    const command = formatUnicorn(CMD, {key})
    cp.execSync(command).toString('utf-8')
    return true
  } catch (error) {
    console.log({error})
    process.stderr.write(error.message)
    return false
  }
}
