export default {
  isProduction: true,
  isNode: typeof window === 'undefined',
  mongo: {
    uri: 'mongodb://localhost/universal-react',
    options: {
      db: {
        safe: true
      }
    }
  }
};
