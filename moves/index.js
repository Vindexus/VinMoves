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

  movesAtlas[key] = require(path);
  movesAtlas[key].key = key;
  movesAtlas[key].urls = movesAtlas[key].urls || {}
  movesAtlas[key].urls.edit = 'https://github.com/Vindexus/VinMoves/edit/master/moves/' + key + '.js';
  movesList.push(movesAtlas[key]);
}

module.exports = {
  atlas: movesAtlas,
  list: movesList
}