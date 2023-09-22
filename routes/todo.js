var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res,) {
  const user = req.session.user
  if (!user) {
    res.redirect('/users/login')
    return
  }
  res.render('todo', { title: 'todossssss', user });
});

router.post('/', function(_req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
