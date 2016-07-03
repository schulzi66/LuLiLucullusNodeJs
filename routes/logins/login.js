var conf = require('../../conf.json');
var express = require('express');
var router = express.Router();
//
// var googleLogin = require('./google');
// router.use('/google', googleLogin);
//
// var facebookLogin = require('./facebook');
// router.use('/login/facebook', facebookLogin);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});


router.get('/profile',
  function(req, res){
    res.render('profile', { user: req.session.user });
});

// router.get('/profile',
//   require('connect-ensure-login').ensureLoggedIn(),
//   function(req, res){
//     res.render('profile', { user: req.session.user });
// });

module.exports = router;
