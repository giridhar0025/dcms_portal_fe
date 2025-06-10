export const config = {
  runner: 'local',
  specs: ['./tests/e2e/**/*.ts'],
  maxInstances: 1,
  capabilities: [{ browserName: 'chrome' }],
  logLevel: 'error',
  framework: 'mocha',
  services: ['chromedriver'],
  reporters: ['spec'],
  mochaOpts: { timeout: 60000 },
  autoCompileOpts: { tsNodeOpts: { transpileOnly: true } },
};
