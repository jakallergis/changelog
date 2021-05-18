import {env, execPath} from 'process'
import cp from 'child_process'
import {join} from 'path'

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  env['INPUT_REPO'] = 'changelog-generator'
  env['INPUT_OWNER'] = 'jakallergis'
  env['INPUT_SKIPIFNOVERSIONTAGONHEAD'] = 'true'
  const np = execPath
  const ip = join(__dirname, '..', 'lib', 'src', 'action.js')
  const options: cp.ExecFileSyncOptions = {
    env
  }
  console.log(cp.execFileSync(np, [ip], options).toString())
})
