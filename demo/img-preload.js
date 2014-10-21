var Promise = require('bluebird')
var imgAsync = require('./img-async')

var noop = function() {}

module.exports = function(paths, progress, options) {
	progress = progress||noop
	var count = 0
	return Promise.map(paths, function(file, index, total) {
		return imgAsync(file)
			.then(function(img) {
				progress(++count / total)
				return { 
					image: img,
					src: file
				}
			})
	}, options)
}