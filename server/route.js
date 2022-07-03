const express = require('express');
const passport = require('passport');

const CLIENT_URL = 'http://localhost:3000';

const router = express.Router();

router.get('/login/success', (req, res) => {
  if (req.user) {
    return res.status(200).json({
      success: true,
      message: 'successfull',
      user: req.user,
    });
  }
  return res.status(400).json({
    success: false,
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  return res.status(200).json({
    success: true,
  });
});

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'failure',
  });
});

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    } //error exception

    // user will be set to false, if not authenticated
    if (!user) {
      res.status(401).json(info); //info contains the error message
    } else {
      // if user authenticated maintain the session
      req.logIn(user, function () {
        return res.status(200).json({
          success: true,
          user,
        });
        // do whatever here on successful login
      });
    }
  })(req, res, next);
});

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed',
  })
);
router.get(
  '/github',
  passport.authenticate('github', { scope: ['profile', 'email'] })
);

router.get(
  '/github/callback',
  passport.authenticate('github', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed',
  })
);

module.exports = router;
