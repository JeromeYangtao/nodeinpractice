let Writable = require('stream').Writable

class CountStream extends Writable {
  constructor (matchTxt, options) {
    super(options)
    this.count = 0
    this.matcher = new RegExp(matchTxt, 'ig')
  }

  _write (chunk, encodeing, cb) {
    let matchs = chunk.toString().match(this.matcher)
    if (matchs) {
      this.count += matchs.length
    }
    cb()
  }

  end () {
    this.emit('total', this.count)
  }
}

module.exports = CountStream