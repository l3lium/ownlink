/***
TIMELINE Russe
Jasmina & Fabienne
Volee R2D2 / Stella
VIP 2013
**/
var topCorrectCards = 0;
var badTentatives = 0;
// Create the pile of playing cards
var numbers = [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12,13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
var nbWagons = 7;

$( init );
 
function init() {

// Hide the information divs
  $('.info').hide();
   $('.indice').hide();
  $('.info button').click(function () {
	$('.info:not("#successMessage")').hide()
	});

  // Reset the game
  topCorrectCards = 0;
  badTentatives = 0;
  $('#cardPile').html( '' );
  $('#topCardSlots').html( '' );
  $("#badAnswers").html(0);
  $('#topCardSlots').addClass('beginningMargin');
 
  //randomize the cards for distribution
  numbers.sort( function() { return Math.random() - .5 } );
 
 //put 5 of the randomized cards in the middle where the player can pick them up
  for ( var i=0; i<5; i++ ) {
    placePlayingCard(numbers[i]);
	}

	dragTimeLineCard();
	
	$("#topCardSlots").sortable( {
	forceHolderSize:"true",
	forcePlaceholderSize : "true",
	placeholder: "ui-state-highlight"
	});
	
	$("#cardPile").sortable({
	forceHolderSize:"true",
	forcePlaceholderSize : "true",
	placeholder: "ui-state-highlight",
	connectWith :"#topCardSlots",
	beforeStop:function( event, ui ) {
		handleDrop(event, ui);
		}
});
}

//handles the dropped card, verifies if it is in the correct position
function handleDrop(event, ui) {
	var previous = 0;
	var next = 1000;
	var current = parseInt(ui.item[0].id);
	var previousSibling = ui.placeholder[0].previousElementSibling;
	 
	 //if card is put back in game do not do any of the next, handle the drop only if the
	 //card is put on the train
	
	 if(previousSibling.parentElement.id != "cardPile") {
		 if(previousSibling != undefined && previousSibling != null) {
			previousSibling = ui.placeholder[0].previousElementSibling.previousElementSibling;
		}
		
		if(previousSibling != undefined && previousSibling != null) {
			previous =  previousSibling.id ;
		}
		
		if(ui.placeholder[0].nextElementSibling != undefined && ui.placeholder[0].nextElementSibling !=null) {
			next = ui.placeholder[0].nextElementSibling.id;
		 }
		
		if((parseInt(previous) < current) && (parseInt(next) > current)) {
			manageCorrectCard(ui.item[0]);
		} else {
			manageWrongCard(ui.item[0]);
			}
		showEndMessage();
	}
}

function manageWrongCard(card) {
		$("#cardPile").sortable("cancel");
		badTentatives++;
		//play bad sound
		$('#badMove')[0].play();
		$("#badAnswers").html(badTentatives);
		if(badTentatives < 3) {
			$('#indice' + card.id).fadeIn(600).delay(1500).fadeOut(600);
			}
}

//manage the behaviour of the game in case the card has been correctly placed
function manageCorrectCard(card) {
	$(card).addClass("correct");
	//return the card by replacing the image by its verso, a regex just inserts a v between the c and the card number
	var versoImage = $(card).html().replace(/([c])(?=[0-9])/ig, '$1v');
	$(card).html(versoImage);
	$(".beginningMargin").removeClass("beginningMargin");
	//add score
	topCorrectCards++;
	placePlayingCard(numbers[(nbWagons-1)+topCorrectCards]);
	showInfo(card.id);
}
//utility function to place the available playing cards in the middle
function placePlayingCard(id) {
	  $('<div><img src=img//c' + id + '.png></div>').attr( 'id', id ).appendTo( '#cardPile' );
}
//place timeline card at init
function dragTimeLineCard() {
	$($('#topCardSlots')).append("<div id=8 class='firstCard correct'><img src=img//c8.png></div>");
}

//show information popup for the correctly placed card
 function showInfo(id) {
	$('#info' + id).show();
	$('#info' + id).animate({
	  left: '380px',
	  top: '130px',
	  width: '500px',
	  height: 'auto',
	  opacity: 1
	} );
	//play welldone sound
	$('#wellDone')[0].play();
  }
  
 /* If all the cards have been placed correctly then display a message
and reset the cards for another game */
function showEndMessage() {
	if ( topCorrectCards == nbWagons-1 ) {
		$('#successMessage').show();
		$('#successMessage').animate({
		  left: '380px',
		  top: '130px',
		  width: '500px',
		  height: 'auto',
		  opacity: 1
		} );
		$('#train')[0].play();
	} else {
		if(badTentatives == 3) {
		$('#failureMessage').show();
		$('#failureMessage').animate({
		  left: '380px',
		  top: '130px',
		  width: '500px',
		  height: 'auto',
		  opacity: 1
		} );
		$('#gameOver')[0].play();
		}
	}
}

	  


