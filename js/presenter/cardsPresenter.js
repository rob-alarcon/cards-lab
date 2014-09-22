/**
*
* Presenter is an object that serves as a mediator between the model 
* and a consumir (goal is to be consumer agnostic)
*
**/
var CardsPresenter = function() {
	var _that = this;

	_that.deck = [];
};

CardsPresenter.prototype.getNewDeck = function() {
	this.deck = new Deck();


	console.log(this.deck)

	$(document).trigger('DeckReset', [this.deck]);
};

CardsPresenter.prototype.shuffle = function() {
	
	var deck = this.deck.deck;

	console.log('shuffle')
	console.log(deck)

	for (var i = 0; i < deck.length; i++) {
		var randomIndex = Math.abs(Math.floor(Math.random() * 41)); //  a number between 0 and 41
		console.log(randomIndex)
		// Swap 
		var current = deck[i];
		deck[i] = deck[randomIndex];

		deck[randomIndex] = current;
	}

	this.deck.deck = deck;


	$(document).trigger('cardsShuffled', [this.deck]);
};
