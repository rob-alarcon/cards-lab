

// DeckCancvasView is a inmediate executed function that returns a constructor for DeckCanvasView
var DeckCanvasView = (function() {
	var __handleCardsShuffled = function(a, b) {
		_displayDeckCanvas(b.deck);

	};

	var __handleDeckReset = function(a, b) {
		_displayDeckCanvas(b.deck);

	};

	var _displayDeckCanvas = function(cards) {
		// simulate argument cards
		// var cards = b.deck;


		var suits = {
			"Diamonds": "♦",
			"Hearts": "♥",
			"Spades": "♠",
			"Clubs": "♣"
		};

		var b_canvas = document.getElementsByTagName("canvas")[0];
		b_canvas.width = cards.length * 25;
		b_canvas.height = (cards.length / 3) * 8;
		b_canvas.font = "12px sans-serif";
		  var b_context = b_canvas.getContext("2d");
		  // b_context.fillRect(50, 25, 150, 100);


		  

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
			//yPosition += 10;
			if ( (xPosition + 43) > window.screen.width - 200) { // a hard coded value just for testing purposes
				xPosition = 5;
				yPosition += 70;
			}

			b_context.moveTo(xPosition, yPosition);
		};
	}



	var global;
		
	var DeckCanvasView = function(containerElement) {
			
		var _that = this;

		/**
		* DOM element that serves as a container for the View
		*
		**/
		_that.el = containerElement;

		_that.canvas = document.createElement('canvas');

		// Register Event Listenets
		$(document).on('cardsShuffled', __handleCardsShuffled);
		$(document).on('DeckReset', __handleDeckReset);

		global = _that;

		_that.el.appendChild(_that.canvas)

	};

	DeckCanvasView.prototype.displayDeck = function(cards) {

		var div = $("#js-deck-information-container");

		div.empty();

		for (var i = cards.length - 1; i >= 0; i--) {
			div.append('<div class="card ' + cards[i].suit + '">' + cards[i].value + '</div>');
		};
	};

	// Important
	// Return the constructor as the only exposed object 
	return DeckCanvasView;	
})();

