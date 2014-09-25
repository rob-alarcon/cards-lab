

// UserView is a inmediate executed function that returns a constructor for UserView
var UserView = (function() {

	// Hold a closure to the View object
	var _that;

	// Bind event handlers 
	var _bind = function() {
		
		// add an appropriate event listener
		_that.addEventListener("rob.userAdded", function(e) { __handleUserAdded(e.user) });
	};


	var __handleUserAdded = function(user) {

		console.log('on the view')
		console.log(user);

		_that.render();
	}
		
	var UserView = function(containerElement) {
			
		_that = this;

		/**
		* DOM element that serves as a container for the View
		*
		**/
		_that.el = containerElement;

		_bind();

		// Register Event Listenets
		$(document).on('cardsShuffled', __handleCardsShuffled);
		$(document).on('DeckReset', __handleDeckReset);

		_that.el.appendChild(_that.canvas)

	};

	UserView.prototype.render = function() {
		console.log('render');
	};

	// Important
	// Return the constructor as the only exposed object 
	return UserView;	
})();

