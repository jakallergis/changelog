import path from 'path'

let packageJSON = {} as any

export default function getCurrentVersion(): string {
  try {
    const mainPath = process.env.INIT_CWD
    const fullPath = path.resolve(mainPath!)
    const packageJSONPath = path.resolve(mainPath!, 'package.json')
    packageJSON = require(packageJSONPath)
    console.log({mainPath, fullPath, packageJSONPath})
  } catch (e) {
    console.log(`[ERROR]: ${e.message}`)
  }
  return packageJSON.version || 'v0.0.0'
}
