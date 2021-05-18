import path from 'path'

let packageJSON = {} as any

interface IPackageJSON {
  repository: string
  version: string
}

export default function getPackageJSON(): IPackageJSON {
  try {
    const mainPath = process.env.INIT_CWD
    const packageJSONPath = path.resolve(mainPath!, 'package.json')
    packageJSON = require(packageJSONPath)
  } catch (e) {
    console.log(`[ERROR]: ${e.message}`)
  }
  return packageJSON
}
