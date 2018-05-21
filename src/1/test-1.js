let assert = require('assert')
let CountStream = require('./countStream')
let countStream = new CountStream('测试')
let fs = require('fs')
let passed = 0

countStream.on('total', function (count) {
  assert.equal(count, 1)
  passed++
})

fs.createReadStream(__filename).pipe(countStream)

process.on('exit', function () {
  console.log('Assertions passed: ', passed)
})