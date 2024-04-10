import { exec }  from 'child_process'
import * as util from 'util'
import middy     from '@middy/core'

const execPromise = util.promisify(exec)

export const handler = middy(async () => {
  console.debug('transcribe')
  await runCommand()
  await transcribe('./output.wav')
})

async function runCommand() {
  try {
    const { stdout } = await execPromise('ls -l')
    console.log(stdout)
  } catch (error) {
    console.error(`Error executing command: ${error}`)
  }
}

async function transcribe(filePath: string): Promise<void> {
  try {
    const command = `./whisper/main -l japanese -m ./whisper/models/ggml-tiny.bin -f ${filePath}`
    const { stdout } = await execPromise(command)
    console.log(stdout)
  } catch (error) {
    console.error(`Error executing command: ${error}`)
  }
}
