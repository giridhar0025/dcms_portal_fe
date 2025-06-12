import { spawn, ChildProcess } from 'child_process';
import type { Options } from '@wdio/types';

let server: ChildProcess;

export const config: Options.Testrunner = {
  runner: 'local',
  specs: ['./e2e/specs/**/*.ts'],
  maxInstances: 1,
  capabilities: [{ browserName: 'chrome' }],
  logLevel: 'error',
  framework: 'mocha',
  reporters: ['spec'],
  services: ['chromedriver'],
  onPrepare: () => {
    server = spawn('npm', ['run', 'preview'], { stdio: 'inherit' });
  },
  onComplete: () => {
    if (server) server.kill();
  },
  mochaOpts: {
    timeout: 60000
  },
  autoCompileOpts: {
    tsNodeOpts: {
      transpileOnly: true
    }
  }
};
