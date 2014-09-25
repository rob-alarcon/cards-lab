

// UserView is a inmediate executed function that returns a constructor for UserView
var UserView = (function(eventTokens, PubSub) {

	// Hold a closure to the View object
	var _that;

	// Bind event handlers 
	var _bind = function() {
		
		// add an appropriate event listener
		PubSub.subscribe(eventTokens.userAdded, function(token, e) { console.log(e); __handleUserAdded(e.user); });
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

	};

	UserView.prototype.render = function() {
		console.log('render');
	};

	// Important
	// Return the constructor as the only exposed object 
	return UserView;	
})(rob.eventTokens, PubSub);

