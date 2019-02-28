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

// Relevance
var qns_1 = [
  {
    "qn":"A Year 1 student needs to give a class presentation about how the lack of sleep affects teenagers’ performance in school. She has to find relevant information for her presentation. Choose the passage which best fulfils the criterion of relevance.",
    "option":[
      "Sleep is characterized by synchronized events in billions of synaptically coupled neurons in thalamocortical systems. The activation of a series of neuromodulatory transmitter systems during awakening blocks low-frequency oscillations, induces fast rhythms, and allows the brain to recover full responsiveness.",
      "For 14 to 17-year-olds, the recommended amount of sleep is eight to ten hours a night. Teens who sleep less tend to have poorer cognitive skills and worse grades than their well-rested peers, according to Professor Michael Chee, director of the Centre for Cognitive Neuroscience at Duke-NUS."
    ],
    "ans": 1
  },
  {
    "qn":"For the issue of UK Parliament’s rejection of the Brexit deal, which is a more relevant piece of news?",
    "option":[
      "In January 2019, Members of Parliament voted by 432 votes to 202 to reject the deal , setting out the terms of Britain's exit from the EU on 29 March. This is also the largest defeat for a sitting government in history.",
      "The business of Parliament of the United Kingdom takes place in two Houses: the House of Commons and the House of Lords. Their work is similar: making laws (legislation), checking the work of the government (scrutiny), and debating current issues."],
    "ans": 0
  },
  {
    "qn":"Which passage helps one understand the concept of \"metaphysics\".",
    "option":[
      "Physics is the natural science that studies matter and its motion and behavior through space and time and that studies the related entities of energy and force. ",
      "Metaphysics is the branch of philosophy that examines the fundamental nature of reality, including the relationship between mind and matter, between substance and attribute, and between possibility and actuality. "],
    "ans": 1
  }
];

var qns_2 = [
  {
    "qn":"The reason is:",
    "option":[
      "The passage is about sleeping.",
      "The passage meets the requirements of the class presentation topic.",
      "The passage is supported by actual research.",
      "The passage is supported by the views of an expert."],
    "ans": 1
  },
  {
    "qn":"The reason is:",
    "option":[
      "The passage gives a summary about the event.",
      "The passage gives specific data about the votes.",
      "The passage makes comparison to the past.",
      "The passage is updated."],
    "ans": 0
  },
  {
    "qn":"The reason is:",
    "option":[
      "The passage is succint.",
      "The passage shows the definition of metaphysics.",
      "The passage is more comprehensive than the other one.",
      "The other passage contains factual mistakes."],
    "ans": 1
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
        window.localStorage.setItem('CRAAPstateR', 'R');
        window.location.href = "index.html";
      }
      else {
          window.location.href = "quizR.html";
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
