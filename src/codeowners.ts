import { error, info } from '@actions/core'
import { existsSync, promises as fs } from 'fs'
import { CodeOwnersEntry, parse } from 'codeowners-utils'

const validCodeownersPaths = ['CODEOWNERS', '.github/CODEOWNERS', 'docs/CODEOWNERS']
const stringify = (input?: unknown) => JSON.stringify(input)

export const getCodeowners = async (): Promise<CodeOwnersEntry[]> => {
  const codeownersLocation = findCodeownersLocation()
  const codeownersContents = await fs.readFile(codeownersLocation, { encoding: 'utf-8' })
  const codeowners = parse(codeownersContents)
  info('Parsed CODEOWNERS:')
  info(stringify(codeowners))
  return codeowners
}
const findCodeownersLocation = (): string => {
  const codeownersLocation = validCodeownersPaths.find(path => existsSync(path))
  if (!codeownersLocation) {
    error(`Did not find a CODEOWNERS file in: ${stringify(validCodeownersPaths)}.`)
    process.exit(1)
  }
  info(`Found CODEOWNERS at ${codeownersLocation}`)
  return codeownersLocation
}
