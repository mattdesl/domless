var animate = require('gsap-promise')

module.exports = {

	progress: function(value) {
		animate.to(this.percent, 1.0, { value: value, ease: "easeOutQuad", override: 1 })
	},

	create: function(app) {
		this.position = { x: -200, y: 20}
		this.percent = { value: 0.0 }
	},

	show: function(app) {
		return animate.to(this.position, 1.0, {
			x: 20,
			ease: 'easeOutExpo'
		})
	},

	hide: function(app) {
		return animate.to(this.position, 1.0, {
			x: -200,
			delay: 1.0,
			ease: 'easeOutExpo'
		})
	},

	draw: function(app, dt) {
		var ctx = app.context
		var w = 100
		ctx.fillRect(this.position.x, this.position.y, w*this.percent.value, 25)
		ctx.strokeRect(this.position.x, this.position.y, w, 25)
	}
}