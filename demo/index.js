var Promise = require('bluebird')
// raise stack limit, feature of v8/node.js
// Error.stackTraceLimit = 100;

var preloadImages = require('./img-preload')
var images = require('./image-paths')
var transitions = require('transitions')
var States = require('./states')

require('canvas-testbed')(render, start)

var sections = {
	preload: require('./sections/preload'),
	base: require('./sections/base'),
	other: require('./sections/other')
}

var app = { sprites: {} },
	states = States()

function render(ctx, width, height, dt) {
	app.context = ctx
	app.width = width
	app.height = height

	ctx.clearRect(0, 0, width, height)

	if (typeof states.current.draw === 'function')
		states.current.draw(app, dt)
}

function start(ctx, width, height) {
	app.context = ctx
	app.width = width
	app.height = height

	app.get = function(name) {
		return sections[name]
	}.bind(app)
	app.go = function(name) {
		return states.display(this, this.get(name))
	}.bind(app)


	var preload = sections.preload,
		next = sections.base

	Promise.delay(500).then(function() {
		return states.display(app, preload)
	}).then(function() {
		return preloadImages(images, preload.progress.bind(preload))
	}).then(function(images) {
		images.forEach(function(i) {
			app.sprites[i.src] = i.image
		})
		return images
	}).then(function() {
		return states.display(app, next)
	})


	// states.open(app, sections)

	// var preload = sections.preload
	// transitions.create(preload, app)
	// 	.then(function() {
	// 		view = preload
	// 		return transitions.show(preload, app)
	// 	})
	// 	.then(function() {
	// 		return preloadImages(images, preload.progress.bind(preload))
	// 	})
	// 	.then(function(images) {
	// 		console.log("all images loaded")
	// 	})
	// 	.then(function() {
	// 		return transitions.hide(preload, app)
	// 	})
}