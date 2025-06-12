import type { Options } from '@wdio/types'

export const config: Options.Testrunner = {
  runner: 'local',
  specs: ['./tests/e2e/**/*.ts'],
  framework: 'mocha',
  services: ['devtools'],
  reporters: ['spec'],
  capabilities: [
    {
      browserName: 'chrome',
    },
  ],
  baseUrl: 'http://localhost:4173',
}
export default config
