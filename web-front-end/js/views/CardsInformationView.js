
/**
* Cards Information View is an auto executionable function that will return a constructor for
* CardsInformationView, this is done so we can have a closure where we can have private variables and functions
* inside of CardsInformationView
*/
var CardsInformationView = (function(eventTokens, PubSub) {

	/**
	* Holds a closure of this
	*/
	var _that;

	/**
	* Handles the event of "deck" shuffled
	*/
	var __handleCardsShuffled = function(a, b) {

		_displayDeck(b.deck);
	};

	/**
	* Handles the event of "deck" reseted
	*/
	var __handleDeckReset = function(a, b) {
		_displayDeck(b.deck);

	};

	/**
	* Handles the event of card served.
	*/
	var __handleCardServed = function( token, deck ) {
		_displayDeck(deck.deck);
	}

	/**
	* Simple stub that renders the deck using plain old jQuery.
	*/
	var _displayDeck = function(cards) {

		var div = $("#js-deck-information-container");

		div.empty();

		for (var i = cards.length - 1; i >= 0; i--) {
			div.append('<div class="card ' + cards[i].suit + '">' + cards[i].value + '</div>');
		};
	};

	/**
	* View Constructor.
	* @constructor
	*/
	var CardsInformationView = function(containerElement) {
					
		_that = this;

		/**
		* DOM element that serves as a container for the View
		*/
		_that.el = containerElement;

		$(document).on('cardsShuffled', __handleCardsShuffled);
		$(document).on('DeckReset', __handleDeckReset);

		// Trigger an event to the Cards Views
		PubSub.subscribe(eventTokens.cardServed, __handleCardServed);

	};

	// Return the Constructor as the only available exposed object
	return CardsInformationView;

})(rob.eventTokens, PubSub);

