var counter = 0,
    score = 0,
    now_one = true,
    one_true = true;

/*
- Qns_1 are the idenfication of fake news (2-option MCQs)
  Qns_2 are the reasons why a fake news is fake (4-option MCQs)
- now_one is true -> render Qns_1; is false -> render Qns_2
- for each qn, score one if both the qn_1 part and qn_2 parts are correct
*/

// Purpose
var qns_1 = [
  {
    "qn":"The tiles in Justin’s house have popped and cracked. Which passage would you more likely accept? Choose the passage which best fulfils the criterion of purpose.",
    "option":[
      "Justin says the popped tiles are commonly triggered by the poorly made cement. Mixing sand, cement and water in the wrong ratio led air pockets underneath the tiles to pop. He says the contractor who renovated his house should offer a free repair for the damaged tiles.",
      "Justin’s wife says the popped tiles are commonly triggered by the poorly made cement. Mixing sand, cement and water in the wrong ratio led air pockets underneath the tiles to pop. She says that HDB needs to send an expert to check whether the popped tiles were caused by poorly made cement or by the cool weather and humidity before deciding on whether the contractor is responsible for repair."
    ],
    "ans": 1
  },
  {
    "qn":"Which passage is less reliable based on the criterion of Purpose?",
    "option":[
      "Thomas Barrass is an Australian rules footballer who plays for the West Coast Eagles in the Australian Football League (AFL). He has played as a key defender since his junior career with Claremont.",
      "Thomas Barrass is an Australian rules footballer who plays for the West Coast Eagles in the Australian Football League (AFL). (You can now order tickets for Australian Football League matches on the AFL mobile app.)"],
    "ans": 1
  },
  {
    "qn":"Which passage about the Burmese Mountain Dogs is less reliable, based on the criterion of Purpose?",
    "option":[
      "The Burmese Mountain Dog is a breed of dog able to guard, ferret small game, and protect property. The Burmese Mountain Dogs are remarkably clean dogs. They are easy to keep as they are rarely noisy or quarrelsome, unless provoked. So, do you want to own a Burmese Mountain Dog?",
      "The Burmese Mountain Dog is a medium sized, muscular dog originally bred in Burma (Myanmar) to guard Buddhist temples. It is often mistaken by tourists as a German Shepherd. Burmese Mountain Dog was originally bred to guard the temples and keep the temples free of rodents and beggars. It is also known as the Burmese Temple Dog. "],
    "ans": 0
  }
];

var qns_2 = [
  {
    "qn":"The reason is:",
    "option":[
      "The passage is supported by the views of experts.",
      "The passage explains the cause of popped tiles.",
      "The passage provided more reasons to explain the cause.",
      "The passage does not contain possible vested interest."],
    "ans": 3
  },
  {
    "qn":"The reason is:",
    "option":[
      "The passage gives wrong information about AFL.",
      "The passage is not succinct.",
      "The passage might prmote AFL tickets to the reader.",
      "The passage does not include Thomas Barrass's role as a key defender."],
    "ans": 2
  },
  {
    "qn":"The reason is:",
    "option":[
      "There is a section on asking whether people are interested in buying Burmese Mountain Dogs.",
      "The passage gives little information about Burmese Mountain Dogs.",
      "The passage is not succinct.",
      "The passage does not explain why Burmese Mountain Dogs are clean."],
    "ans": 0
  }
];



// assigning the commonly accessed dom elements to variables
var $name = $('.name'),
    $generate = $('.generate'),
    $result = $('.results'),
    $score = $('.score'),
    $thanks = $('.thanks'),
    $retry = $('.retry'),
    $options_1 = $('.options-1'),
    $options_2 = $('.options-2');


var quizApp = {};

// the initial state of the quiz:
// starts off by showing the "name" value in the first item in the data object
// hides the 'next' button, results, score and 'thanks for playing' html as a default

quizApp.init = function() {
  var selection = qns_1[counter];
  var answer = selection["ans"];
  var choices = selection["option"];  // distinguish b/t options-1 or -2 and option (no 's')

  now_one = true;

  $name.html("Lets start the Quiz?");
  $generate.show();
  $result.hide();
  $score.hide();
  $thanks.hide();
  $retry.hide();
  $options_1.hide();
  $options_2.hide();

}

// the function for moving through the quiz

quizApp.generate = function() {

  if (counter < qns_1.length) {
    if (now_one) {
      var selection = qns_1[counter];
      var answer = selection["ans"];
      var choices = selection["option"];


      $name.html(selection["qn"]);
      $('#op1-0').html(choices[0]);
      $('#op1-1').html(choices[1]);

      $result.hide();
      $score.hide();
      $name.show();
      $options_1.show();
      $options_2.hide();
      $generate.hide();
      now_one = false;
    }
    else {
      var selection = qns_2[counter];
      var answer = selection["ans"];
      var choices = selection["option"];

      $name.html(selection["qn"]);
      $('#op2-0').html(choices[0]);
      $('#op2-1').html(choices[1]);
      $('#op2-2').html(choices[2]);
      $('#op2-3').html(choices[3]);

      $result.hide();
      $score.hide();
      $name.show();
      $options_1.hide();
      $options_2.show();
      $generate.hide();
      now_one = true;
    }
  }
  else {
    $generate.hide();
    $thanks.show().append("Score: " + score + " out of " + counter);
    $retry.show();
    if (score == counter) {
      $retry.text("Congratulation!")
    }
    $retry.click(function(){
      if (score == counter) {
        window.localStorage.setItem('CRAAPstateP', 'P');
        window.location.href = "index.html";
      }
      else {
          window.location.href = "quizP.html";
      }

    });

  }
}

// the event handler that determines whether the user's selection was right

$('.choice').click(function(e) {

  $result.show();
  $score.show();
  $name.hide();
  $options_1.hide();

  var selection;
  var idStr;  // to make the id string for correct option
  if (!now_one) {     // here false for Qn_1, true for Qn_2, since now_one is changed after each round of rendering
    selection = qns_1[counter];
    idStr = "op1-";
  }
  else {
    selection = qns_2[counter];
    idStr = "op2-";
  }

  var chosenAnswer = e.target.id;
  var answer = selection["ans"];      // answer is the sequence of the option A/B/C/D
  var choices = selection["option"];
  var correctAnswer = choices[answer];    // this is the text of the correct answer option
  var correctAnswerStr;

  correctAnswerStr = idStr + answer;

  var tmpCorrect;
  console.log(chosenAnswer + "," + correctAnswerStr);
  if (chosenAnswer == correctAnswerStr) {
    $result.html("<span class='right'>Correct!</span> It's a " + correctAnswer + ".");
    tmpCorrect = true;
  } else {
    $result.html("<span class='wrong'>Wrong!</span> It's a " + correctAnswer + ".");
    tmpCorrect = false;
  }

  // should we hide the options when revealing correct answers?
  $options_1.hide();
  $options_2.hide();

  if (!now_one) {    // now qn 1
    one_true = tmpCorrect
  }
  else {            // now qn 2
    if (tmpCorrect && one_true) {
      score ++;
    }
    counter ++;
  }

  $score.html("You're " + score + " for " + counter + ".");
  $generate.show();
});



// "main"
$(document).ready(function() {
  quizApp.init();
});

$generate.on('click', function() {
  quizApp.generate();
});
