var fs              = require('fs')
var marked = require('marked')
var movesAtlas = {}
var movesList = []

var files = fs.readdirSync('./moves')

String.prototype.toCamelCase = function(str) {
  return this.replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
      .replace(/\s/g, '')
      .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
}

for(var i in files) {
  var file = files[i];
  var key = file.substr(0,file.length-3);
  var ext = file.substr(file.length-3)
  console.log('ext', ext)

  if(ext != '.md') {
    continue;
  }

  if(key == 'index') {
    continue;
  }

  var path = './moves/' + file;

  var markdown = fs.readFileSync(path, 'utf8');
  var move = {}
  var parts = markdown.split('---')
  var moveMD = parts[0]
  var metaMD = parts[1]
  var meta = {}
  var metaParts = metaMD.split("\n")
  for(var i = 0; i < metaParts.length; i++) {
    var mp = metaParts[i]
    var parts = mp.split(': ')
    if(parts[0]) {
      var k = parts[0].toCamelCase().trim()
      //console.log(k + ': ' + parts[1])
      move[k] = parts[1]
    }
  }
  var parts = moveMD.split("\n>")
  var descMD = parts[0]
  var flavorMD = null
  if(parts[1]) {
    flavorMD = parts.slice(1, parts.length).join("\n>").trim()
  }
  var descLines = descMD.split("\n")
  move.name = descLines[0].replace('#', '').trim()
  move.description = marked(descLines.slice(1,descLines.length).join("\n").trim())
  move.flavor = flavorMD

  /**
  console.log('descLines', descLines)
  //console.log('metaParts', metaParts)
  console.log('metaMD', metaMD)
  console.log('meta', meta)
  /**/
  
  var releaseDate = new Date(move.releaseDate).getTime()

  if(isNaN(releaseDate)) {
    console.log('invalid date', move.releaseDate)
    console.log('move.name', move.name)
    console.log('----')
    releaseDate = 0
  }

  if(releaseDate > 0) {
    var now = new Date().getTime()
    if(process.env.DAYSINFUTURE) {
      now += 60 * 60 * 24 * 1000 * process.env.DAYSINFUTURE //Let's make it the future for testing
    }
    move.isReleased = now >= releaseDate
  }
  else {
    move.isReleased = true
  }
  
  move.releaseDate = new Date(releaseDate)
  move.releaseDateFormatted = move.releaseDate.toDateString()
  move.key = key;
  move.editUrl = 'https://github.com/Vindexus/VinMoves/edit/master/moves/' + key + '.md';
  movesAtlas[key] = move
  movesList.push(movesAtlas[key]);
}

module.exports = {
  atlas: movesAtlas,
  list: movesList
}