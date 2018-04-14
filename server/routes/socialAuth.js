const express = require('express');
const router = express.Router();
const passport = require('passport');
const axios = require('axios');
const pick = require('lodash/pick');
const authenticate = require('../middleware/authenticate');
// router.get('/github', function(req,res) {
//   res.redirect(`https://github.com/login/oauth/authorize?scope=user:email&client_id=${process.env.CLIENT_ID}&redirect_uri=https://vast-everglades-58513.herokuapp.com/auth/github/callback`);
// });
// router.get('/github/callback', function(req,response) {
//   const options = {'headers': {'Accept': 'application/json'}};
//   axios.post(`https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&redirect_uri=https://vast-everglades-58513.herokuapp.com&client_secret=${process.env.CLIENT_SECRET}&code=${req.query.code}`, options)
//        .then(res => {
//            axios.get(`https://api.github.com/user?${res.data}`).then(res => {
//              console.log(res.data);
//              response.send(res.data);
//            }).catch(err => {
//              console.log(err);
//            });
//        });
// });

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/' }));

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/', failureFlash: true }));

router.get('/github', passport.authenticate('github'));
router.get('/github/callback', passport.authenticate('github', { successRedirect: '/', failureRedirect: '/', failureFlash: true }));

router.get('/', function(req,res) {
  if(req.isAuthenticated()) {
    const { local, facebook, google, github, bars } = pick(req.user, ['bars', 'local', 'facebook', 'google', 'github']);
    res.send({isAuthenticated: true, user: {bars, local, facebook, google, github}});
  } else {
    res.send({isAuthenticated: false});
  }
});

router.get('/getAccounts', authenticate, function(req,res) {
  try {
    console.log('localUser', req.localUser);
    console.log('socialUser', req.user);
    if(req.localUser && req.isAuthenticated()) {
      console.log('inside if');
      const localUser = req.localUser;
      let bars = req.user.bars;
      let socials  = pick(req.user, ['facebook', 'google', 'github']);
      // socials = socials.filter(social => social.id !== undefined);
      console.log('buu');
      console.log(socials);
      // bars = bars.filter( bar => {
      //   return localUser.bars && bars.forEach( localBar => {
      //     return bar.id !== localBar.id
      //   });
      // });
      console.log(bars);
      res.send({localUser, socials, bars});
    }
  } catch(err) {
    console.log(err);
    res.send(err);
  }
});

router.delete('/logout', function(req,res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
