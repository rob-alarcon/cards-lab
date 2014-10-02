
/**
* DeckCancvasView is a inmediate executed function that returns a constructor for DeckCanvasView
*/
var DeckCanvasView = (function(eventTokens, PubSub) {

	/**
	* Holds a closure of this
	*/
	var _that;

	/**
	* Handles the event of "deck" shuffled
	*/
	var __handleCardsShuffled = function(a, b) {
		_displayDeckCanvas(b.deck);
	};

	/**
	* Handles the event of "deck" reseted
	*/
	var __handleDeckReset = function(a, b) {
		_displayDeckCanvas(b.deck);
	};

	/**
	* Handles the event of card served.
	*/
	var __handleCardServed = function( token, deck ) {
		_displayDeckCanvas(deck.deck);
	};

	/**
	* Simple stub that renders the deck using HTML5 Canvas.
	*/
	var _displayDeckCanvas = function(cards) {
		
		// Four possible card suits
		var suits = {
			"Diamonds": "♦",
			"Hearts": "♥",
			"Spades": "♠",
			"Clubs": "♣"
		};

		var originalCardsLength = 52;

		var b_canvas = document.getElementsByTagName("canvas")[0];
		b_canvas.width = originalCardsLength * 25;
		b_canvas.height = (originalCardsLength / 3) * 8;
		b_canvas.font = "12px sans-serif";
		  var b_context = b_canvas.getContext("2d");
		  	  

		  var xPosition = 5;
		  var yPosition = 5;
		  
		  for (var i = cards.length - 1; i >= 0; i--) {
			
		  	if (cards[i].suit === 'Hearts' || cards[i].suit === 'Diamonds') {
		  		b_context.lineWidth = 7;
		  		b_context.strokeStyle = 'black';
	      		b_context.stroke();
		  		
		  		b_context.fillStyle = "#FF0000";
		  	}else {
		  		b_context.lineWidth = 7;
		  		b_context.strokeStyle = 'black';
	      		b_context.stroke();

		  		b_context.fillStyle = "#000000";
		  	}

			b_context.fillRect( xPosition, yPosition, 30, 50);
			b_context.fillStyle = "#FFFFFF";

			b_context.fillText(cards[i].value + " " + suits[cards[i].suit], xPosition + 5, yPosition + 25);
			
			xPosition += 35;
			if ( (xPosition + 43) > window.screen.width - 200) { // a hard coded value just for testing purposes
				xPosition = 5;
				yPosition += 70;
			}

			b_context.moveTo(xPosition, yPosition);
		};
	}

	/**
	* View Constructor.
	* @constructor
	*/
	var DeckCanvasView = function(containerElement) {
			
		_that = this;

		/**
		* DOM element that serves as a container for the View
		*
		**/
		_that.el = containerElement;

		_that.canvas = document.createElement('canvas');

		_that.canvas.style.width = "1120px";

		// Register Event Listenets
		$(document).on('cardsShuffled', __handleCardsShuffled);
		$(document).on('DeckReset', __handleDeckReset);

		_that.el.appendChild(_that.canvas)

		// Trigger an event to the Cards Views
		PubSub.subscribe(eventTokens.cardServed, __handleCardServed);

	};

	// Important
	// Return the constructor as the only exposed object 
	return DeckCanvasView;	
})(rob.eventTokens, PubSub);

