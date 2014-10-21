var animate = require('gsap-promise')

module.exports = {

	create: function(app) {
		this.position = { x: -50, y: 0}
		this.image = app.sprites['img/ballerina1.jpg']

		this._listener = function(ev) {
			console.log("click", app.go('other'))
		}.bind(this)
		window.addEventListener('click', this._listener)
	},

	dispose: function(app) {
	},

	show: function(app) {
		return animate.to(this.position, 1.0, {
			x: 20,
			ease: 'easeOutExpo'
		})
	},

	hide: function(app) {
		window.removeEventListener('click', this._listener)

		return animate.to(this.position, 1.0, {
			x: -200,
			delay: 1.0,
			ease: 'easeOutExpo'
		})
	},

	draw: function(app, dt) {
		var ctx = app.context
		var w = 100
		ctx.drawImage(this.image, this.position.x, this.position.y, 100, 100)
	}
}