

/**
*
* Presenter is an object that serves as a mediator between the model 
* and a consumir (goal is to be consumer agnostic)
*
* @param eventTokens object simple map of custom event tokens to be used with PubSub
* @param usersRepository object repository of Users (fake right know)
* @param PubSub object Mediatior object library.
*
**/
var UsersPresenter = (function(eventTokens, usersRepository, PubSub) {

	// Hold a closure of the presenter.
	var _that;

	// Array of active users on the session
	var _activeUsers = [];

	var _bind = function() {
		
			
	};	

	var UsersPresenter = function(usersReposit) {
		_that = this;

		_bind();
	};


	UsersPresenter.prototype.saveUser = function(username) {

		// App should not allow more than 4 Users
		if (_activeUsers.length >= 4) {
			throw "Game cannot allow more than 4 users.";
		}

		// Check if required user params were provided 
		if (!username) {
			throw "Username is required";
		}

		var user = usersRepository.saveUser(username);

		if (user) {
			// Save the user into the presenter local list of active users
			_activeUsers.push(user);

			// create and dispatch the event informing that a new user has been created and it's active
			PubSub.publish( username + '__' + eventTokens.userAdded, { "user": user });
		}
	};

	UsersPresenter.prototype.hitUserWithCard = function(user, card) {


		// Get user form the active user list
		var modifiedUser = _.find(_activeUsers, function( u ) {
			return u.name = user.name;
		});

		modifiedUser.cards.push(card);

		// Publish to the user view the updated user
		// [TODO] right now this uses a Backbone like whole object re-render
		// this should be a more handy and explicit two way data-binding ala ko or angular
		// The subscribe token will be modified with username + token
		var userServedToken = modifiedUser.name + '__' + eventTokens.serveOne;

		PubSub.publish(userServedToken, modifiedUser);
	};

	return UsersPresenter;
})(rob.eventTokens, usersRepository, PubSub);