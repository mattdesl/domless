var mixes = require('mixes')
var Transition = require('transitions')

function States() {
	if (!(this instanceof States))
		return new States()
	this.current = {}
}

mixes(States, {

	display: function(data, next) {
		var last = this.current	

		//animation states for previous and next item
		var prevState = Transition(last||{}, data)
		var nextState = Transition(next||{}, data)

		//handle sequencing
		return prevState.hide()
			.then(prevState.dispose)
			.then(set.bind(this, next)) //change value of current
			.then(nextState.create)
			.then(nextState.show)
	},
})

function set(next) {
	this.current = next||{}
}

module.exports = States