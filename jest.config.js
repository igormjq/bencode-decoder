module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js',
    '!<rootDir>/src/shared/constants.js',
  ],
  moduleNameMapper: {
    '@services/(.*)': ['<rootDir>/src/services/$1'],
    '@shared/(.*)': ['<rootDir>/src/shared/$1'],
  }
}