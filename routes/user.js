var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('users/register');
});

router.post('/register', function(req, res, next) {
  // create user
  // redirect to login
});

router.get('/', function(_req, res) {
  res.render('users/login');
});

router.post('/', function(_req, res) {
  // validate user
  // if valid, redirect to todo
  // if invalid, redirect to login with error message
});

module.exports = router;
