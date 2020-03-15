var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const User = mongoose.model('User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  User.list(function(err, dt){
    if (err){
      res.json({success: false, error: err});
      return;
    }
    res.json({success: true, data: dt});
  });
});

router.post('/post', function(req, res, next) {
  const user = new User(req.body);
  user.save(function(err, userCreated){
    if (err){
      res.json({success: false, error: err});
      return;
    }
    res.json({success: true, data: userCreated});
  });
});

router.put('/:id', function(req, res, next) {
  User.update({_id: req.params.id}, req.body, function(err){
    if (err){
      return next(err);
    }
    res.json({success: true});
  });
});

router.delete('/:id', function(req, res, next) {
  console.log('delete ' + req.params.id);
  User.deleteOne({_id: req.params.id}, function(err){
    if (err){
      return next(err);
    }
    res.json({success: true});
  });
});

module.exports = router;
