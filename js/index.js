// global variables
var h1 = $('h1');
var sentence = $('.sentence');
var time  = 0;
var $body = $('body');
var pBegin = $('p#begin');
var totalBeat = 0;

// click "Run" to replay
var loading = [
	// transition animation
    { elements: $body, properties: { width: '20%' } },
    { elements: $body, properties: { width: '30%' } },
    { elements: $body, properties: { width: '50%' } },
    { elements: $body, properties: { width: '100%' } },
    { elements: $body, properties: { height: '100%' }, options: {
      complete: function () {
        $('.wrap').velocity( 'transition.slideUpIn' );
        $('html').css({ background: '#B7DFFD' });
		//change background for html
        $('p#begin').html();
        $('p#begin').hide();
        $('div#outer').css({display: "block"});
        $('div#outer').css({opacity: "100"});
        $('div.inner').css({opacity: "100"});
        // clean pbegin and hide it
      }
    }
  }
];

function defaultHide(){
  $('html').css({ background: '#B7DFFD' });
  //change background for html
  $body.css({background:'#C9E8FF'});
  $('div').css({opacity: 0});
  $('p#txtC').html('Well done! You have beaten Enemy C');
  $('p#txtC2').html('');
  $('p#begin').hide();
  $('div#outer').css({display: "block"});
  $('div#outer').css({opacity: "100"});
  $('div.inner').css({opacity: "100"});
}

// init
$('document').ready(function(){
  //window.localStorage.clear();
  if (window.localStorage.getItem('CRAAPstateC') == "C") {
    // what will happen after beating Currency
      defaultHide();
      $('button#C').hide();
      totalBeat += 1;
  }
  if (window.localStorage.getItem('CRAAPstateR') == "R") {
      // what will happen after beating Currency
        defaultHide();
        $('button#R').hide();
        totalBeat += 1;
  }
  if (window.localStorage.getItem('CRAAPstateA1') == "A1") {
      // what will happen after beating Currency
        defaultHide();
        $('button#A1').hide();
        totalBeat += 1;
  }
  if (window.localStorage.getItem('CRAAPstateA2') == "A2") {
      // what will happen after beating Currency
        defaultHide();
        $('button#A2').hide();
        totalBeat += 1;
  }
  if (window.localStorage.getItem('CRAAPstateP') == "P") {
      // what will happen after beating Currency
        defaultHide();
        $('button#P').hide();
        totalBeat += 1;
  }

  if (totalBeat == 5) {
    jumpFinal();
  }


});

// click to fade-out old-text and fade-in new text [no.1]
(function() {
	//local variables
	var pBegin = $('p#begin');
	// click event on the <p> element
	pBegin.click(function() {
		if (time == 0) {
			// fade-out all text with a delay and set up function queue
			sentence.fadeOut(1000)
				.delay(500)
				.queue(function(n) {
				// replace text of <h1> element and fade-in
				h1.text("Long long time ago, a princess who believed in fake news received one piece of letter that invites her to a castle nearby...")
					.fadeIn(500); n();
				// replace html of <p> elemnt (content and id) and fade-in
				pBegin.html("Click to continue")
					.fadeIn(500); n();
			});
			time += 1;
		}else if (time ==1){
			// fade-out all text with a delay and set up function queue
			sentence.fadeOut(500)
				.delay(500)
				.queue(function(n) {
				// replace text of <h1> element and fade-in
				h1.text("That was a trap from the enemy, but she did not notice. She was caught and trapped.")
					.fadeIn(500); n();
				// replace html of <p> elemnt (content and id) and fade-in
				pBegin.html("Click to continue")
					.fadeIn(500); n();
			});
			time += 1;
		}
		else if (time == 2){
			// fade-out all text with a delay and set up function queue
			sentence.fadeOut(500)
				.delay(500)
				.queue(function(n) {
				// replace text of <h1> element and fade-in
				h1.text("You as a brave knight, will go and save her.")
					.fadeIn(500); n();
				// replace html of <p> elemnt (content and id) and fade-in
				pBegin.html("Start your journey.")
					.fadeIn(500); n();
			});
			time +=1;
		}
		else{
			// third click
			$body.css({width: '0%'});
			$body.css({height: '.25rem'});
			$body.css({background:'#C9E8FF'});
			h1.text("");
			$('div').css({opacity: 0});
			$.Velocity.RunSequence(loading);
		};
	});
})();




// modal
// Get the button that opens the modal
var buttonC = document.getElementById("C");
var buttonR = document.getElementById("R");
var buttonA1 = document.getElementById("A1");
var buttonA2 = document.getElementById("A2");
var buttonP = document.getElementById("P");

// Get the <span> element that closes the modal
var spanC = document.getElementById("closeC");
var spanR = document.getElementById("closeR");
var spanA1 = document.getElementById("closeA1");
var spanA2 = document.getElementById("closeA2");
var spanP = document.getElementById("closeP");

// MODAL C
var modalC = document.getElementById('ModalC');
var c1 = document.getElementById('c1');
var c2 = document.getElementById('c2');
var c3 = document.getElementById('c3');
var c4 = document.getElementById('c4');

// When the user clicks the button, open the modal
buttonC.onclick = function() {
  modalC.style.display = "block";
  modalC.style.opacity = 100;
  c1.style.opacity = 100;
  c2.style.opacity = 100;
  c3.style.opacity = 100;
  c4.style.opacity = 100;
}

//MODAL R
var modalR = document.getElementById('ModalR');
var r1 = document.getElementById('r1');
var r2 = document.getElementById('r2');
var r3 = document.getElementById('r3');
var r4 = document.getElementById('r4');

buttonR.onclick = function() {
  modalR.style.display = "block";
  modalR.style.opacity = 100;
  r1.style.opacity = 100;
  r2.style.opacity = 100;
  r3.style.opacity = 100;
  r4.style.opacity = 100;
}

//MODAL A1
var modalA1 = document.getElementById('ModalA1');
var a11 = document.getElementById('a11');
var a12 = document.getElementById('a12');
var a13 = document.getElementById('a13');
var a14 = document.getElementById('a14');

buttonA1.onclick = function() {
  modalA1.style.display = "block";
  modalA1.style.opacity = 100;
  a11.style.opacity = 100;
  a12.style.opacity = 100;
  a13.style.opacity = 100;
  a14.style.opacity = 100;
}

//MODAL A2
var modalA2 = document.getElementById('ModalA2');
var a21 = document.getElementById('a21');
var a22 = document.getElementById('a22');
var a23 = document.getElementById('a23');
var a24 = document.getElementById('a24');

buttonA2.onclick = function() {
  modalA2.style.display = "block";
  modalA2.style.opacity = 100;
  a21.style.opacity = 100;
  a22.style.opacity = 100;
  a23.style.opacity = 100;
  a24.style.opacity = 100;
}

//MODAL A2
var modalP = document.getElementById('ModalP');
var p1 = document.getElementById('p1');
var p2 = document.getElementById('p2');
var p3 = document.getElementById('p3');
var p4 = document.getElementById('p4');

buttonP.onclick = function() {
  modalP.style.display = "block";
  modalP.style.opacity = 100;
  p1.style.opacity = 100;
  p2.style.opacity = 100;
  p3.style.opacity = 100;
  p4.style.opacity = 100;
}


// When the user clicks on <span> (x), close the modal
spanC.onclick = function() {
  modalC.style.display = "none";
}
spanR.onclick = function() {
  modalR.style.display = "none";
}
spanA1.onclick = function() {
  modalA1.style.display = "none";
}
spanA2.onclick = function() {
  modalA2.style.display = "none";
}
spanP.onclick = function() {
  modalP.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it

window.onclick = function(event) {
  if (event.target == modalC) {
    modalC.style.display = "none";
  }
  if (event.target == modalR) {
    modalR.style.display = "none";
  }
  if (event.target == modalA1) {
    modalA1.style.display = "none";
  }
  if (event.target == modalA2) {
    modalA2.style.display = "none";
  }
  if (event.target == modalP) {
    modalP.style.display = "none";
  }
}

// jump to quizApp
function jumpC(){
  window.location.href = "quizC.html";
}
function jumpR(){
  window.location.href = "quizR.html";
}
function jumpA1(){
  window.location.href = "quizA1.html";
}
function jumpA2(){
  window.location.href = "quizA2.html";
}
function jumpP(){
  window.location.href = "quizP.html";
}
function jumpFinal(){
  window.location.href = "final.html";
}
