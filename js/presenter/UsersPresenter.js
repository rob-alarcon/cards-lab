

/**
*
* Presenter is an object that serves as a mediator between the model 
* and a consumir (goal is to be consumer agnostic)
*
**/
var UsersPresenter = (function(usersRepository) {

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
			var event = new CustomEvent("rob.userAdded", { "user": user });
			_that.dispatchEvent(event);
		}
	};

	return UsersPresenter;
})(usersRepository);