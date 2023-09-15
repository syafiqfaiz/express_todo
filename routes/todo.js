var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('todo', { title: 'todossssss' });
});

router.post('/', function(_req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
