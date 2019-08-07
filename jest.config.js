module.exports = {
    //setupFiles: ['<rootDir>/jest.setup.js'],
    setupFilesAfterEnv: [
        '@testing-library/react/cleanup-after-each',
        '@testing-library/jest-dom/extend-expect'
    ],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/']
    
  }