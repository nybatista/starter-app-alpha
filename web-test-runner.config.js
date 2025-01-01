import { defaultReporter } from '@web/test-runner';
import { junitReporter } from '@web/test-runner-junit-reporter';

export default {
  files: ['src/tests/unit-tests/**/*.test.js'], // or however your tests are organized

  testFramework: {
    config: {
      ui: 'bdd',
      timeout: '2000',
    },
  },
  nodeResolve: true,
  reporters: [
    // use the default reporter only for reporting test progress
    defaultReporter({ reportTestResults: false, reportTestProgress: true }),
    // use another reporter to report test results
    junitReporter({
      outputPath: './src/tests/results/unit-test-results.xml', // default `'./test-results.xml'`
      reportLogs: true, // default `false`
    }),
  ],
  // any other @web/test-runner options
};
