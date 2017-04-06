var express = require('express');
var router = express.Router();

var util = require('../util');
var time =  util.dateFormat('isoDate') + " " + util.dateFormat('isoTime');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: util.dateFormat('isoDate') + " " + util.dateFormat('isoTime') });
});

module.exports = router;
