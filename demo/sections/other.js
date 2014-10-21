var animate = require('gsap-promise')

module.exports = {

	create: function(app) {
		this.position = { x: -100, y: -100}
		this.image = app.sprites['img/p1.jpg']
		console.log("SHOWING!")
		
		this._listener = function(ev) {
			console.log("click", app.go('base'))
		}
		window.addEventListener('click', this._listener)
	},

	dispose: function(app) {
	},

	show: function(app) {
		return animate.to(this.position, 1.0, {
			y: 20,
			x: 20,
			ease: 'easeOutExpo'
		})
	},

	hide: function(app) {
		window.removeEventListener('click', this._listener)
		
		return animate.to(this.position, 1.0, {
			x: -100,
			delay: 1.0,
			ease: 'easeOutExpo'
		})
	},

	draw: function(app, dt) {
		var ctx = app.context
		ctx.drawImage(this.image, this.position.x, this.position.y, 100, 100)
	}
}