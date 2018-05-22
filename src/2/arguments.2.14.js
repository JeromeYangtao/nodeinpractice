var fs = require('fs')
var args = {
  '-h': displayHelp,
  '-r': readFile
}

function displayHelp () {
  console.log('Argument processor:', args)
}

function readFile (file) {
  if (file && fs.existsSync(__dirname + '/' + file)) {
    console.log('Reading:', file)
    require('fs').createReadStream(file).pipe(process.stdout)
  } else {
    console.error('A file must be provied with the -r option')
    // 除了0都代表错误，0是代表正常终止任务
    process.exit(1)
  }
}

if (process.argv.length > 0) {
  process.argv.forEach(function (arg, index) {
    if (args[arg]) {
      args[arg].apply(this, process.argv.slice(index + 1))
    }
  })
}