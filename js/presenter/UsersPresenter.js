

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

	// var _usersRepository = cards.userRepository;

	var UsersPresenter = function(usersReposit) {
		_that = this;
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
			PubSub.publish(eventTokens.userAdded, { "user": user });
		}
	};

	return UsersPresenter;
})(rob.eventTokens, usersRepository, PubSub);