// load all code files in this directory
import { join } from 'path'
import * as fs from "node:fs";

const files_paths = []
// recursively load all files in the current directory and subdirectories
const loadFiles = (dir) => {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const filePath = join(dir, file)
    // check if the file is a directory
    if (fs.statSync(filePath).isDirectory() && file !== 'node_modules') {
        loadFiles(filePath)
    }else if (file.endsWith('.ts') || file.endsWith('.js')) {
      if(!file.includes('check_promises'))
        files_paths.push(filePath)
    }
  }
}
loadFiles("./")
console.log(`Found ${files_paths.length} files: ${files_paths.join(", ")}`)

// check each file
for(const file_path of files_paths) {
  const fileContent = fs.readFileSync(file_path, 'utf8')
  // find all occurrences of "await"
  const awaitMatches = fileContent.match(/(await[\S\s]*?(?:}|(?:await)))/g)
  if(awaitMatches) {
    console.log(`Found ${awaitMatches.length} matches`)
    let awaitsWithoutCatch = 0
    for(const match of awaitMatches) {
      if(!/\.catch/.test(match)) {
        console.log(`Found await without catch in ${file_path}: ${match}`)
        awaitsWithoutCatch++
      }
    }
    if(awaitsWithoutCatch > 0) {
      throw new Error(`ERROR: Found ${awaitsWithoutCatch} await(s) without catch in ${file_path}`)
    }
    console.log(`Found 0 awaits without catch in ${file_path}`)
  }

  // find all occurrences of "throw"
  const throwMatches = fileContent.match(/[^\n]+(throw [\S\s]{8})/g)
  let throwsWithoutNewConstructor = 0
  if(throwMatches) {
      for(const match of throwMatches) {
        if(!/(throw new )/.test(match) && !/^\s*\/\//.test(match) && !/^\s*\/?\s*\*/.test(match)) {
            console.log(`Found throw without new constructor in ${file_path}: ${match}`)
            throwsWithoutNewConstructor++
        }
      }
      if(throwsWithoutNewConstructor > 0) {
        throw new Error(`ERROR: Found ${throwsWithoutNewConstructor} throw(s) without new constructor in ${file_path}`)
      }
      console.log(`Found 0 throws without new constructor in ${file_path}`)
  }
}
