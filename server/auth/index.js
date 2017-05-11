import express from 'express';
import passport from 'passport';
import google from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';
import { googleOptions } from '../config/authentication';
import secrets from '../config/secret';

const router = express.Router();
const GoogleStrategy = google.Strategy;
const secret = secrets.TokenSecret;

export default router;

function signToken(payload) {
  return jwt.sign(payload, secret, { expiresIn: 60 * 60 * 24 });
}

function verifyToken(token, callback) {
  jwt.verify(token, secret, callback);
}

function setTokenCookie(req, res) {
  if (!req.user) {
    return res.status(404).json('Something went wrong, please try again.');
  }
  const token = signToken({ _id: req.user._id, role: req.user.role });
  res.cookie('token', token);
  return res.redirect('/');
}

passport.use(new GoogleStrategy(googleOptions, (accessToken, refreshToken, profile, next) => {
  // save or find user User.findOrCreate(profile, (err, user) => { return next(err, user)});
  const err = null;
  const user = {
    _id: 'id',
    name: 'test',
    role: 'user'
  };
  next(err, user);
}));

router.get('/google', passport.authenticate('google', { scope: ['profile'], session: false }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }), setTokenCookie);

export function isAuthenticated(req, res, next) {
  const token = req.headers.authorization;
  verifyToken(token, (error, decodedToken) => {
    if (error) {
      return res.status(401).json({ message: 'Not authenticated', error });
    }
    // console.log(decodedToken);
    const user = { // finduser User.findById(result.id)
      _id: 'id',
      name: 'test',
      role: 'user',
      board: '/'
    };
    req.user = user;  // eslint-disable-line
    return next();
  });
}
