


var usersRepository = (function() {

	var _saveUser = function(username) {
		return new User(username);
	};

	return {
		saveUser: _saveUser
	}
})();