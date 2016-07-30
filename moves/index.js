var fs              = require('fs')
var movesAtlas = {}
var movesList = []

var files = fs.readdirSync('./moves')


for(var i in files) {
  var file = files[i];
  var key = file.substr(0,file.length-3);

  if(key == 'index') {
    continue;
  }

  var path = './' + file;

  var move = require(path);
  var releaseDate = new Date(move.releaseDate).getTime()
  var now = new Date().getTime()
  if(process.env.DAYSINFUTURE) {
    now += 60 * 60 * 24 * 1000 * process.env.DAYSINFUTURE //Let's make it the future for testing
  }

  move.isReleased = now >= releaseDate
  move.key = key;
  move.urls = move.urls || {}
  move.urls.edit = 'https://github.com/Vindexus/VinMoves/edit/master/moves/' + key + '.js';
  movesAtlas[key] = move
  movesList.push(movesAtlas[key]);
}

module.exports = {
  atlas: movesAtlas,
  list: movesList
}