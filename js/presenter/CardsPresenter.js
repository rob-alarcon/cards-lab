eventTokens = rob.eventTokens;

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


	$(document).trigger('DeckReset', [this.deck]);
};

CardsPresenter.prototype.shuffle = function() {
	
	var deck = this.deck.deck;

	for (var i = 0; i < deck.length; i++) {
		var randomIndex = Math.abs(Math.floor(Math.random() * deck.length)); //  a number between 0 and 41
		
		// Swap 
		var current = deck[i];
		deck[i] = deck[randomIndex];

		deck[randomIndex] = current;
	}

	this.deck.deck = deck;

	$(document).trigger('cardsShuffled', [this.deck]);
};


CardsPresenter.prototype.serveOne = function() {
	
	var popedCard = this.deck.deck.pop();

	// Trigger an event to the Cards Views
	PubSub.publish(eventTokens.cardServed, this.deck );

	return popedCard;
};