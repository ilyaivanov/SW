module.exports = function (w) {

  return {
    files: [
      'src/**/*.ts',
      'src/**/*.tsx',
      '!src/**/*.spec.ts',
      '!src/**/*.spec.tsx',
    ],

    tests: [
      'src/**/*.spec.ts',
      'src/**/*.spec.tsx',
    ],

    env: {
      type: 'node'
    },

    // or any other supported testing framework:
    // https://wallabyjs.com/docs/integration/overview.html#supported-testing-frameworks
    testFramework: 'jasmine'
  };
};
