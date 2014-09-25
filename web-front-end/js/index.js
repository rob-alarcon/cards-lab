/**
*
* index.js is a singleton object that goes along wth the index.html web front end
* 
*
**/
var index = (function($, CardsPresenter) {

	var _cardsPresenter;

	var _usersPresenter;

	/**
	* App Users
	*
	**/
	var _appUsers = [];
		
	/**
	* Bind HTML elements to handlers
	*
	**/
	var _prepareUI = function() {

		$('#js-get-deck').click(__handleGetDeck);

		$('#js-shuffle').click(__handleDeckShuffled);

		$("#js-save-user").click(__handleSaveUser);
	};


	var __handleDeckShuffled = function() {
		_cardsPresenter.shuffle();
	};

	/**
	* Starts a new Deck of Cards.
	*
	**/
	var __handleGetDeck = function() {
		_cardsPresenter.getNewDeck();
	};

	/**
	* Send user provided params
	*
	**/
	var __handleSaveUser = function() {

		// Get the username directly from a jQuery object.
		var username = $("#js-username").val();

		// Call the save User on the users presenter sending just a configuration
		// object as the presenter does not have to know about the UI controls
		_usersPresenter.saveUser(username);

		// [FIXME]
		new UserView();

		// Reset the username control
		$("#js-username").val("");
	};

	return {
		init: function() {

			_prepareUI();

			// Set up the view that displays the Deck information
			// 1 get a reference of the container of the view
			var deckInformationViewContainer = document.getElementById('js-deck-information-container');
			// Create instance of the view
			new CardsInformationView(deckInformationViewContainer);


			var deckCanvasContainer = document.getElementById('js-deck-canvas-container');
			// Create instance of the Canvas View
			new DeckCanvasView(deckCanvasContainer);

			// Create an instance of the Cards and Users Presenter 
			_cardsPresenter = new CardsPresenter();

			// Pass in a reference to the Users repository to the Users Presenter as it is a global object
			_usersPresenter = new UsersPresenter(usersRepository);

			// Retrieve inital deck of cards
			_cardsPresenter.getNewDeck();

		}
	};
})($, CardsPresenter);

