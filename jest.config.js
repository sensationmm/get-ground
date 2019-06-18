module.exports = {
  transform: {
    '^.+\\.jsx?$': `<rootDir>/jest-preprocess.js`,
  },
  modulePaths: ['<rootDir>'],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`,
  },
  testPathIgnorePatterns: [`node_modules`, `.cache`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  setupFiles: [`<rootDir>/loadershim.js`],
  setupFilesAfterEnv: ['<rootDir>/src/test-utils/setup-test-env.js'],
  'collectCoverageFrom': [
    '**/*.{js,jsx}',
    '!coverage/**/*.{js,jsx}',
    '!src/test-utils/**/*.{js,jsx}',
    '!src/config/**/*.{js,jsx}',
    '!**/**config.{js,jsx}',
    '!src/store.js',
    '!src/index.js',
    '!src/containers/StyleGuide/*.{js,jsx}',
    '!src/utils/mockComponent.{js,jsx}',
    '!**/**gatsby**.{js,jsx}',
    '!src/services/BaseService.{js,jsx}',
    '!cypress/**/**.{js,jsx}'
  ]
}
