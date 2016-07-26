var express = require('express');
var router = express.Router();
var Moves = require('../moves');
var movesAtlas = Moves.atlas;
var movesList = Moves.list;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Moves', movesAtlas: movesAtlas, movesList: movesList });
});

module.exports = router;
