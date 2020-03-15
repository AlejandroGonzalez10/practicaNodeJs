var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/post', function(req, res, next){
  console.log('req.query', req.query);
  res.send(JSON.stringify(req.query));
});

module.exports = router;
