$( init );
 
function init() {
 $('#welcomeMessage').hide();
  $('#welcomeMessage').show();
		$('#welcomeMessage').animate({
		  left: '639px',
		  top: '50px',
		  width: '500px',
		  height: 'auto',
		  opacity: 0.8
		} );
		
	$('#continue').click(function () {
		window.location.href = "intro.html";
	});

	$('#startGame').click(function () {
		window.location.href = "timeline.html";
	});

}

