var Promise = require('bluebird')
Promise.longStackTraces()

function foo() {
	console.log(a)
	return 'value'
}

function node(data, cb) {
	console.log(a)
	cb(null, 'value')
}

var fooAsync = Promise.method(foo)
// var fooAsync = Promise.promisify(node)
fooAsync()