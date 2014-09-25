

// UserView is a inmediate executed function that returns a constructor for UserView
var UserView = (function(eventTokens, PubSub) {

	// Hold a closure to the View object
	var _that;

	var _token;

	// Bind event handlers 
	var _bind = function() {
		
		// add an appropriate event listener

		_token = PubSub.subscribe(eventTokens.userAdded, function(token, e) { __handleUserAdded(e.user); });
	};

	var _bindHitMeClick = function(el) {

		var button = $("." + el).find('.js-hit-me');

		$(button).on('click', function(event){
			PubSub.publish(eventTokens.userHitMe, "hitme");
		});

	};

	var __handleUserAdded = function(user) {

		// if there's a user we set a reference to the view and call the render method.
		if (user) {
			_that.user = user;

			_that.render();

			// Unsubscribe token
			PubSub.unsubscribe( _token );
		}
	}
		
	var UserView = function(containerElement) {

		_that = this;

		/** 
		* Will hold a reference to the user
		*
		**/
		_that.user;

		/**
		* DOM element that serves as a container for the View
		*
		**/
		_that.el = containerElement;

		_bind();

	};

	UserView.prototype.render = function() {

		// Render user if available
		if (this.user) {

			var newUserView = $("<div class='cols-sm-3 user-view-" + this.user.name + "'></div>")

			// list item of cards
			var cardsDOM = "";

			for (var i = this.user.cards.length - 1; i >= 0; i--) {
				cardsDOM += '<li class="card ' + this.user.cards[i].suit + '">' + this.user.cards[i].value + '</li>';
			};

			var template = '<h4> <i class="fa fa-user">' + this.user.name + 
							'<button type="button" class="btn btn-sm btn-warning pull-right js-hit-me" >HIT ME!</button>' +
							'</h4>';

			if (this.user.length) {
				template += '<h5 class="cards">Cards</h5>' + 
							'<ul>' +
							cardsDOM +
							'</ul>';
			}

			newUserView.append(
				template
			);

			// Append the new user to the User Views container.
			newUserView.appendTo(_that.el);

			_bindHitMeClick("user-view-" + this.user.name);
		}
	};

	// Important
	// Return the constructor as the only exposed object 
	return UserView;	
})( rob.eventTokens, PubSub);

