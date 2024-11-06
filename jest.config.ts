export default {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  maxWorkers: 1,
};
