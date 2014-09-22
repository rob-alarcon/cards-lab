

var __handleCardsShuffled = function(a, b) {
	console.log('on shuffled')
	console.log(a);
	console.log(b);
	_displayDeck(b.deck);
};

var __handleDeckReset = function(a, b) {
	console.log('on reset')
	console.log(a);	
	console.log(b);

	_displayDeck(b.deck);

};

var _displayDeck = function(cards) {

	var div = $("#js-deck-information-container");

	div.empty();

	for (var i = cards.length - 1; i >= 0; i--) {
		div.append('<div class="card ' + cards[i].suit + '">' + cards[i].value + '</div>');
	};
};
	
var CardsInformationView = function(containerElement) {
		
	var _that = this;

	/**
	* DOM element that serves as a container for the View
	*
	**/
	_that.el = containerElement;

	console.log('fu')

	$(document).on('cardsShuffled', __handleCardsShuffled);
	$(document).on('DeckReset', __handleDeckReset);

};