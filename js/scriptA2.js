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

// Accuracy
var qns_1 = [
  {
    "qn":"Caitlin wants to help her class generate ideas for the Chinese New Year Decoration Competition. She is researching on possibly using mini-oranges or kumquat as decorations and gifts. Which passage would give her more accurate information?",
    "option":[
      "Steve Cheung, of the University of Hong Kong’s sociology department, who studies Chinese customs, explains that the kumquat tree that grows mini oranges called kut, is said to ensure a family will have many generations to come. He explains that it was impolite to present small trees as gifts to people as that would mean wishing the family stays small – something that was not considered auspicious in traditional Chinese families.",
      "According to Chinese Heritage Centre, Kumquat is a play on word sounds. The tree looks like an abundance of gold coins, so it was named ‘Kumquat’, where the word ‘kum’ rhymes with the Cantonese word for gold (金) which symbolise wealth and ‘quat’ rhymes with the Cantonese word for luck (桔). An article from The Journal of Chinese Customs also mentions that giving Kumquats during the festive period symbolizes giving happiness and prosperity to the recipient."
    ],
    "ans": 1
  },
  {
    "qn":"Which passage is more accurate?",
    "option":[
      "On 26 Jan, an outbreak of gastroenteritis affected dozens children at a MindChamps pre-school in Tanglin. Several of those affected were hospitalised and have been discharged.",
      "On 26 Jan, an outbreak of gastroenteritis affected 30 children at a MindChamps pre-school in Tanglin, two of which were hospitalised and have been discharged. Authorities are investigating."],
    "ans": 1
  },
  {
    "qn":"Which passage is more accurate?",
    "option":[
      "North Korean leader Kim Jong Un and US President Donald Trump met in Hanoi, Thailand on Wednesday (Feb 27) for a summit that the United States hopes will persuade North Korea to give up its nuclear weapons in exchange for promises of peace and development.",
      "North Korean leader Kim Jong Un and US President Donald Trump met in Hanoi, Vietnam on Wednesday (Feb 27) for a second summit that the United States hopes will persuade North Korea to give up its nuclear weapons in exchange for promises of peace and development."],
    "ans": 1
  }
];

var qns_2 = [
  {
    "qn":"The reason is:",
    "option":[
      "The passage contains information from someone with authority.",
      "There is a name attached to the information source.",
      "The information presented is consistent across different sources.",
      "The passage contains Chinese words."],
    "ans": 2
  },
  {
    "qn":"The reason is:",
    "option":[
      "The passage gives details about the pre-school.",
      "The passage expresses concerns for the children.",
      "The passage gives specific number of how many children were affected.",
      "The passage includes authorities' reaction."],
    "ans": 2
  },
  {
    "qn":"The reason is:",
    "option":[
      "The passage shows that this would be the second summit between Kim Jong Un and Donald Trump.",
      "The passage indicates where they are going to meet.",
      "The passage is neutral when reporting this piece of news.",
      "Hanoi is in Vietname."],
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
        window.localStorage.setItem('CRAAPstateA2', 'A2');
        window.location.href = "index.html";
      }
      else {
          window.location.href = "quizA2.html";
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
