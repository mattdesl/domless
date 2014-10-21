var fs = require('fs')
var path = require('path')

module.exports = fs.readdirSync(__dirname + '/img').filter(function(f) {
	var e = path.extname(f).toLowerCase().substring(1)
	return ['jpg', 'png', 'jpeg', 'gif', 'bmp'].indexOf(e)!==-1
}).map(function(f) {
	return 'img/'+f
})