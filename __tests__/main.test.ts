import {env, execPath} from 'process'
import cp from 'child_process'
import {join} from 'path'

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  env['INPUT_SKIPIFNOVERSIONTAGONHEAD'] = 'false'
  const np = execPath
  const ip = join(__dirname, '..', 'lib', 'src', 'action.js')
  const options: cp.ExecFileSyncOptions = {env}
  const runner = () => {
    const result = cp.execFileSync(np, [ip], options).toString('utf-8')
    console.log(result)
  }
  expect(runner).not.toThrow()
})
