

// UserView is a inmediate executed function that returns a constructor for UserView
var UserView = (function(eventTokens, PubSub) {

	// Hold a closure to the View object
	var _that;

	var _token;

	// Holds the user nickname to be saved this is a little hack that I have to use right now 
	// for this lab because I didn't think very well about how the view should be rendered.
	var _dirtyUserName;

	// Bind event handlers 
	var _bind = function() {
		
		// add an appropriate event listener

		_token = PubSub.subscribe( _dirtyUserName + '__' + eventTokens.userAdded, __handleUserAdded );
	};

	var _bindHitMeClick = function(el) {



	};

	var __handleUserAdded = function( token, e ) {

		var user = e.user;

		// if there's a user we set a reference to the view and call the render method.
		if (user) {
			_that.user = user;

			// The subscribe token will be modified with username + token
			var userServedToken = _that.user.name + '__' + eventTokens.serveOne;
			PubSub.subscribe( userServedToken, __handleUserModified );

			_that.render();

			// Unsubscribe token
			PubSub.unsubscribe( _token );

			var button = $(".user-view-" + _that.user.name).find('.js-hit-me');
			var userHitMeToken = _that.user.name + '__' + eventTokens.userHitMe;
			var u = _that.user;

			$(document).on('click', ".user-view-" + _that.user.name + ' .js-hit-me', function(event) {

				PubSub.publish( userHitMeToken, u );
			});
		}
	};

	var __handleUserModified = function( token, modifiedUser ) { 

		// Update UserView hard copy of the user
		_that.user = modifiedUser;

		// [SHAME ON YOU]
		// rerender of the view
		_that.render(); 
	};
		
	// [FIXME] delete dirtyUserName
	var UserView = function( containerElement, dirtyUserName ) {

		_that = this;


		_dirtyUserName = dirtyUserName;

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

			var isNew = false;

			var userViewContainer = $(".user-view-" + this.user.name);

			// Check if the placeholder for the user view already exists
			if (!userViewContainer.length) {

				isNew = true;
				// if there's no container we create one on the fly
				userViewContainer = $("<div class='col-sm-12 user-view-" + this.user.name + "'></div>");
			}

			// list item of cards
			var cardsDOM = "";

			for (var i = this.user.cards.length - 1; i >= 0; i--) {
				cardsDOM += '<li class="card ' + this.user.cards[i].suit + '">' + this.user.cards[i].value + '</li>';
			};

			if (isNew) {

				var template = '<h4> <i class="fa fa-user"></i> ' + this.user.name + 
							'<button type="button" class="btn btn-xs btn-warning pull-right js-hit-me" >HIT ME!</button>' +
							'</h4>';

				if (this.user.cards.length) {
					template += '<h5 class="cards">Cards</h5>' + 
								'<ul>' +
								cardsDOM +
								'</ul>';
				}

				userViewContainer.append(
					template
				);

				// Append the new user to the User Views container.
				userViewContainer.appendTo(_that.el);

				_bindHitMeClick("user-view-" + this.user.name);
			} else { // Just rerender the cards
				if( userViewContainer.find('ul').length) {
					userViewContainer.find('ul').empty().append(cardsDOM);	
				}else {
					userViewContainer.append('<h5 class="cards">Cards</h5>' + 
								'<ul>' +
								cardsDOM +
								'</ul>');
				}

			}
		}
	};

	// Important
	// Return the constructor as the only exposed object 
	return UserView;	
})( rob.eventTokens, PubSub);

