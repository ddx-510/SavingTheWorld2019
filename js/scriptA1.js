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

// Authority
var qns_1 = [
  {
    "qn":"A Year 1 student needs to give a class presentation on the topic of building an aquarium for her pet goldfish. Who should she listen to? Choose the passage which best fulfils the criterion of authority.",
    "option":[
      "Mr Wong is 40 years old. He has owned a pet shop that specialises in selling goldfish for 18 years. He says: ‘Set up the aquarium and place it out of direct sunlight. Add gravel to the bottom of the tank and use a bowl to add water gently. Install a water filter. ...’",
      "Dr Jameson is 55 years old. He has been teaching biology at a local university for 30 years. He says, ‘Prepare warm water for the aquarium. Add a few drops of blue colouring to the water to make it look like the deep sea. Pour pebbles into the tank. Install a spotlight that shines directly into the tank. ... ’"
    ],
    "ans": 0
  },
  {
    "qn":"Which passage is more reliable based on the criterion of Authority?",
    "option":[
      "Singtel's Dash subscribers could start using the digital wallet to pay for purchases in Malaysia as early as June this year, after the Singapore telco announced its tie-up with Axiata Digital on Wednesday (27 Feb).",
      "There were speculations about Dash online, claiming that Dash subscribers could start using the digital wallet to pay for purchases in Malaysia as early as June this year."],
    "ans": 0
  },
  {
    "qn":"Which passage information is more reliable based on the criterion of Authority?",
    "option":[
      "According to the authorities, having tighter quotas to calibrate foreign manpower inflows into the local services sector is “necessary” to sustain ongoing restructuring efforts.",
      "Having tighter quotas to calibrate foreign manpower inflows into the local services sector is “necessary” to sustain ongoing restructuring efforts, said Minister of State for Manpower Zaqy Mohamad on Wednesday (Feb 27) as he joined in the debate on the Government’s recent announcement."],
    "ans": 1
  }
];

var qns_2 = [
  {
    "qn":"The reason is:",
    "option":[
      "The passage is written by a scholar that specialises in biology.",
      "The passage wants the goldfish to feel at home in the blue water.",
      "The passage is supported by someone with years of relevant experience.",
      "The passage about building an aquarium."],
    "ans": 2
  },
  {
    "qn":"The reason is:",
    "option":[
      "The passage is an announcement by Singtel.",
      "The passage includes date when it is releasaed.",
      "The passage is more succinct.",
      "The passage sounds promising."],
    "ans": 0
  },
  {
    "qn":"The reason is:",
    "option":[
      "The passage is more detailed.",
      "The passage gives the reason why there would be tighter quotas.",
      "The passage includes date when it is releasaed.",
      "The passage is an announcement by Minister of State for Manpower Zaqy Mohamad."],
    "ans": 3
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
        window.localStorage.setItem('CRAAPstateA1', 'A1');
        window.location.href = "index.html";
      }
      else {
          window.location.href = "quizA1.html";
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
