const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const LocalStrategy = require("passport-local").Strategy;

const GOOGLE_CLIENT_ID = "";
const GOOGLE_CLIENT_SECRET = "";

const GITHUB_CLIENT_ID = "";
const GITHUB_CLIENT_SECRET = "";

// Google Oauth Config.
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

// Github Oauth Config.
passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    function (email, password, done) {
      let user = {
        id: 1,
        name: "Moin Akhter",
        email: "moinakhter179@gmail.com",
        password: "12345678",
      };
      if (email === user.email && password === user.password) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Invaid email or password" });
      }
    }
  )
);

// Serialize determine which data should be store in session
passport.serializeUser((userId, done) => {
  done(null, userId);
});

// Deserialize used to extract data from session
passport.deserializeUser((userId, done) => {
  done(null, userId);
});
