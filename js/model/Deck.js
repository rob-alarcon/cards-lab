

var Deck = function() {

	/** 
	* Clousure for this
	*
	**/	
	var _that = this;

	/** 
	* Holds an array of Cards
	*
	**/
	this.deck = [];

	/** 
	* Constant with the number of Cards on a Deck
	*
	**/
	var _deckLength = 52;

	/** 
	* Constant with the number of Cards per Suit on a Deck
	*
	**/
	var _lengthBySuit = 13;

	/** 
	* Constant array with the type of suits in the deck
	*
	**/
	var _suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];

	/** 
	* functions that builds a deck portion by Suit
	*
	**/
	var _buildDeckBySuit = function(suit)
	{
		// Routine to initialize the Deck
		for(var i = 0; i < _lengthBySuit; i++)
		{
			_that.deck.push(new Card(i + 1, suit));
		}
	};

	// Routine to initialize the Deck
	for(var i = 0; i < _suits.length; i++)
	{	console.log(_suits[i])
		var suit = _suits[i];
		_buildDeckBySuit(suit);
	}

};


