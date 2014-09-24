/**
*
* index.js is a singleton object that goes along wth the index.html web front end
* 
*
**/
var index = (function($, CardsPresenter) {

	var _cardsPresenter;
		
	/**
	* Bind HTML elements to handlers
	*
	**/
	var _prepareUI = function() {

		$('#js-get-deck').click(__handleGetDeck);

		$('#js-shuffle').click(__handleDeckShuffled);

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

			// Create an instance of the Cards Presenter 
			_cardsPresenter = new CardsPresenter();

			// Retrieve inital deck of cards
			_cardsPresenter.getNewDeck();

		}
	};
})($, CardsPresenter);

