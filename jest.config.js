module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    testPathIgnorePatterns: ['/node_modules/'],
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    "testTimeout": 30000,
  };
  