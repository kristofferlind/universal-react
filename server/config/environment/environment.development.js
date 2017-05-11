export default {
  isProduction: false,
  isNode: typeof window === 'undefined',
  mongo: {
    uri: 'mongodb://127.0.0.1/universal-react'
  }
};
