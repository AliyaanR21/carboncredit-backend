// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Imports
import jwt from 'jsonwebtoken';
import LocalStrategy from 'passport-local';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import { GetUser } from '../db-services/user';
import { AUTHORIZED_USER_ROLES } from '../constant';

const { JWT_SECRET } = process.env;

// Debug to ensure .env is loaded
console.log('Loaded JWT_SECRET:', JWT_SECRET);

// ----------------- LOGIN CHECK MIDDLEWARE -----------------
const LoginCheck = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({
        error: info.error || 'Authentication failed',
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

// ----------------- GENERATE JWT TOKEN -----------------
const GenerateToken = ({ _id, email, expireTime }) => {
  try {
    const token = jwt.sign(
      { _id, email },
      JWT_SECRET,
      { expiresIn: expireTime }
    );
    return token;
  } catch (err) {
    err.errorMessage = 'Error While Generating Token';
    throw err;
  }
};

// ----------------- AUTHENTICATE JWT TOKEN MIDDLEWARE -----------------
const AuthenticateAuthToken = passport.authenticate('jwt', {
  session: false
});

// ----------------- LOCAL LOGIN STRATEGY -----------------
const LocalLoginStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passReqToCallback: true
  },
  async (req, email, password, done) => {
    try {
      console.log("🛂 Login Attempt Email:", email);

      const user = await GetUser({ filterParams: { email } });
      console.log("🛂 Found User:", user);

      if (!user) {
        console.log("❌ No user found");
        return done(null, false, {
          error: 'Email not found'
        });
      }

      const isValid = user.ValidatePassword(password);
      console.log("🔒 Password Valid:", isValid);

      if (!isValid) {
        console.log("❌ Invalid password");
        return done(null, false, {
          error: 'Incorrect password'
        });
      }

      console.log("✅ Authentication successful");
      return done(null, user);
    } catch (err) {
      console.log("❌ Error during authentication:", err);
      return done(err);
    }
  }
);

// ----------------- JWT AUTHENTICATION STRATEGY -----------------
const AuthenticationStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
  },
  async (jwtPayload, done) => {
    try {
      const user = await GetUser({ filterParams: { _id: jwtPayload._id } });

      if (!user) return done(null, false);

      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (jwtPayload.exp && jwtPayload.exp < currentTimestamp) {
        return done(null, false, { message: 'Token has expired' });
      }

      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }
);

// ----------------- EXPORTS -----------------
export {
  AuthenticationStrategy,
  AuthenticateAuthToken,
  GenerateToken,
  LoginCheck,
  LocalLoginStrategy
};
