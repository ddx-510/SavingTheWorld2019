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

// currency
var qns_1 = [
  {
    "qn":"In October 2017, Emily wanted to purchase a smartphone. To make her decision ... ",
    "option":[
      "To make her decision on what is the best smartphone model to purchase, she decided to consult the most recent publication of the widely read and comprehensive “Best Smartphone Comparison List – 2016”.",
      "To make her decision on what is the bestsmartphone model to purchase, she decided to consult the various reviews of recent smartphones introduced over the past few months in 2017."
    ],
    "ans": 1
  },
  {
    "qn":"Which one is a more useful piece of news, based on the criterion of currrency?",
    "option":[
      "According to the Immigration and Checkpoints Authority (ICA) on Wednesday (27 Feb 2019), the number of contraband cases detected at Singapore's checkpoints in 2018 was the highest annual figure recorded.",
      "More packets of contraband cigarettes, and also vehicles were involved in smuggling of contraband cigarettes, were seized in 2014, the Singapore Customs revealed in a statement."],
    "ans": 0
  },
  {
    "qn":"Which piece of information below is more useful for one to learn about Goods and Services Tax in recent years?",
    "option":[
      "According to Singapore Budget 2018, the goods and services tax (GST) is set to increase from 7 per cent to 9 per cent some time between 2021 and 2025.",
      "The Goods and Services Tax (GST) is a tax on domestic consumption. It was introduced in Singapore on 1 April 1994 at the rate of 3 percent; it was then increased to 4 percent from 1 January 2003, 5 percent from 1 January 2004 and 7 percent from 1 July 2007."],
    "ans": 0
  }
];

var qns_2 = [
  {
    "qn":"The reason is:",
    "option":[
      "The passage is about the most updated list of smartphones so she could make a decision.",
      "The passage is about smartphones so she can make her decision.",
      "The passage is supported by other research to inform her decision.",
      "The passage is supported by the views of many experts to aid her decision."],
    "ans": 0
  },
  {
    "qn":"The reason is:",
    "option":[
      "The passage is by ICA.",
      "The passage is more updated.",
      "The passage is not only about contraband cigarettes or vehicles.",
      "The passage makes comparison to previous years."],
    "ans": 1
  },
  {
    "qn":"The reason is:",
    "option":[
      "The passage is part of Budget 2018.",
      "The passage shows GST rate in the future.",
      "The passage shows how GST changes over the years.",
      "The passage is about recent years, rather than GST a decade ago."],
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
        window.localStorage.setItem('CRAAPstateC','C');
        window.location.href = "index.html";
      }
      else {
          window.location.href = "quizC.html";
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
