const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const users = {};

const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env

passport.serializeUser((user, done) => {
  console.log('Serializing user:', user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('Deserializing user:', id);
  const user = users[id];
  done(null, user);
});

// Google OAuth 2.0 strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // Your Google Client ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Your Google Client Secret
      callbackURL: '/auth/google/callback', // Redirect URI
    },
    (accessToken, refreshToken, profile, done) => {

      if (users[profile.id]) {
        return done(null, users[profile.id]); // User already exists
      }

      const user = {
        id: profile.id,
        displayName: profile.displayName,
        email: profile.emails && profile.emails[0] ? profile.emails[0].value : null,
        photo: profile.photos && profile.photos[0] ? profile.photos[0].value : null,
      };

      users[profile.id] = user;
      return done(null, user); // Pass the user object to serialize into the session
    }
  )
);
