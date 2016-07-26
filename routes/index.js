var express = require('express');
var router = express.Router();
var Moves = require('../moves');
var movesAtlas = Moves.atlas;
var movesList = Moves.list;

function shuffle(a) {
  var j, x, i;
  for (i = a.length; i; i--) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
}

router.get('/move/:id', function(req, res, next) {
  var move = movesAtlas[req.params.id]
  res.render('index', { 
    title: move.name + ' by ' + move.author, 
    movesAtlas: movesAtlas, 
    movesList: [move],
    activePage: false
  });  
});


/* GET home page. */
router.get('/:page?', function(req, res, next) {
  var pages = {
    newest: {
      field: 'releaseDate', 
      order: 1,
      title: 'Newest Moves'
    },
    oldest: {
      field: 'releaseDate',
      order: -1,
      title: 'Oldest Moves'
    },
    'author': {
      field: 'author',
      order: 1,
      title: 'Moves by Author'
    },
    random: {
      title: 'Random Moves'
    }
  }
  var activePage = req.params.page || 'newest'
  var page =  pages[activePage]
  var by = page.field

  var order = page.order
  if(activePage == 'random') {
    shuffle(movesList);
  }
  else {
    movesList = movesList.sort(function (a, b) {
      if(a[by] == b[by]) {
        return 0
      }
      return (a[by] > b[by] ? 1 : -1) * order;
    })    
  }
  res.render('index', { 
    title: page.title, 
    movesAtlas: movesAtlas, 
    movesList: movesList,
    activePage: activePage
  });
});

module.exports = router;
