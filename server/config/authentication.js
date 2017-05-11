import secret from './secret';

export const googleOptions = {
  clientID: secret.GoogleClientID,
  clientSecret: secret.GoogleClientSecret,
  callbackURL: 'http://localhost:9000/auth/google/callback'
};
