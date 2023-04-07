var bStart = document.querySelector(".start"); // start button

var quizCard = document.querySelector("#card"); // container for questions
var qText = document.querySelector("#question") // question text
var correctOrIncorrect = document.createElement("p"); // message that states answer is correct or incorrect
correctOrIncorrect.setAttribute("style", 
    "position: absolute; top: 25%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%); font-size: 32px; color: white;"
);

// multiple choice answers
var choiceOne = document.createElement("button");
var choiceTwo = document.createElement("button");
var choiceThree = document.createElement("button");
var choiceFour = document.createElement("button");

// timer variables
var timerText = document.querySelector("#timer");
var timerNum = 60;
timerText.textContent = timerNum;
var timerActive = true;

// high score & username forms
var scoreMessage = document.createElement("p");
var userNameForm = document.createElement("form");
var userName = document.createElement("input");
var userNameSubmit = document.createElement("button");
var userNameHighScore = document.createElement("p");

// question objects; contains questions & multiple-choice answers
var qOne = {
    q: "Commonly used data types do NOT include:",
    aOne: "alerts", // correct answer
    aTwo: "strings",
    aThree: "booleans",
    aFour: "objects",
}
var qTwo = {
    q: "A condition in an if / else statement is enclosed in:",
    aOne: "Square Brackets",
    aTwo: "Curly Brackets",
    aThree: "Parentheses", // correct answer
    aFour: "Quotes",
};
var qThree = {
    q: "Arrays in JavaScript can be used to store:",
    aOne: "Numbers",
    aTwo: "Strings",
    aThree: "Other Arrays",
    aFour: "All of the above", // correct answer
};
var qFour = {
    q: "A very useful tool for JavaScript debugging is:",
    aOne: "function",
    aTwo: "console.log()", // correct answer
    aThree: "for loops",
    aFour: "terminal/bash",
};

// list of questions to pull from
var qList = [qOne, qTwo, qThree, qFour];

// removes "take quiz" button, then starts quiz & timer
function startQuiz() {  
    quizCard.removeChild(bStart);
    qOneCard();
}

// starts timer; counts down
function startTimer() {
    // resets timer values
    timerNum = 50;
    timerActive = true;

    /* show high scores after submitting + retry button */
    var timerInterval = setInterval(function() {
        timerNum--;
        timerText.textContent = timerNum;

        // if game is finished, timer stops
        // if timer is less/equal than 0, sets timer to 0
        if (timerNum <= 0 || timerActive === false) {
            clearInterval(timerInterval);
            timeOut();
        }
      }, 1000);
}

// if time runs out, automatically redirects to end screens
function timeOut() {
    if (timerNum <= 0) {
        timerNum = 0;
        timerText.textContent = timerNum;
        timerActive = false;
        showScore();
    }
}

// resets text for each new question
function newQuestion(qNum) {
    // card's top text
    qText.textContent = qList[qNum].q;

    // multiple choice text
    choiceOne.textContent = qList[qNum].aOne;
    choiceTwo.textContent = qList[qNum].aTwo;
    choiceThree.textContent = qList[qNum].aThree;
    choiceFour.textContent = qList[qNum].aFour;
}

// appends multiple choice buttons
function qButtonSet() {
    quizCard.appendChild(choiceOne);
    quizCard.appendChild(choiceTwo);
    quizCard.appendChild(choiceThree);
    quizCard.appendChild(choiceFour);
}

// Question 1
function qOneCard() {
    // changes card's top text to question
    qButtonSet();

    newQuestion(0);
    quizCard.addEventListener('click', qOneAnswer);
}
// Q1's answer
function qOneAnswer(event) {
    /* If correct answer is selected WITHIN quiz card, +25 points & correct prompt. 
    If other buttons are pressed, incorrect prompt. 
    Any button press moves to next question. */
    if (event.target === choiceOne) {
        console.log(timerNum);
        correct()
        qTwoCard();
    } else if (event.target === choiceTwo || event.target === choiceThree || event.target === choiceFour) {
        incorrect();
        console.log("nope.avi");
        console.log(timerNum);
        qTwoCard();
    }
}

// Question 2
function qTwoCard() {
    // removes & resets properties from previous buttons
    quizCard.removeEventListener('click', qOneAnswer);
    newQuestion(1);
    quizCard.addEventListener('click', qTwoAnswer);
}
// Q2's answer
function qTwoAnswer(event) {
    if (event.target === choiceThree) {
        console.log(timerNum);
        correct()
        qThreeCard();
    } else if (event.target === choiceOne || event.target === choiceTwo || event.target === choiceFour) {
        incorrect();
        console.log("nope.avi");
        console.log(timerNum);
        qThreeCard();
    }
}

// Question 3
function qThreeCard() {
    quizCard.removeEventListener('click', qTwoAnswer);
    newQuestion(2);
    quizCard.addEventListener('click', qThreeAnswer);
}
// Q3's answer
function qThreeAnswer(event) {
    if (event.target === choiceFour) {
        console.log(timerNum);
        correct()
        qFourCard();
    } else if (event.target === choiceOne || event.target === choiceTwo || event.target === choiceThree) {
        incorrect();
        console.log("nope.avi");
        console.log(timerNum);
        qFourCard();
    }
}

// Question 4
function qFourCard() {
    quizCard.removeEventListener('click', qThreeAnswer);
    newQuestion(3);
    quizCard.addEventListener('click', qFourAnswer);
}
// Q4's answer
function qFourAnswer(event) {
    if (event.target === choiceTwo) {
        console.log(timerNum);
        timerActive = false; // flag that stops the timer
        correct()
        showScore();
    } else if (event.target === choiceOne || event.target === choiceThree || event.target === choiceFour) {
        incorrect();
        console.log("nope.avi");
        console.log(timerNum);
        timerActive = false;
        showScore();
    }
}

// shows user their score + prompts them to input their initials
function showScore() {
    // removes quiz's buttons and their functions
    quizCard.removeEventListener('click', qFourAnswer);
    quizCard.removeChild(choiceOne);
    quizCard.removeChild(choiceTwo);
    quizCard.removeChild(choiceThree);
    quizCard.removeChild(choiceFour);

    qText.textContent = "Finished!"
    
    // displays score as the current timer value
    scoreMessage.textContent = "Your high score is: " + timerNum;
    quizCard.appendChild(scoreMessage);
    
    // Enter your initials: (form)
    // stores high score for next screen
    quizCard.appendChild(userName);
    quizCard.appendChild(userNameSubmit);
    userNameSubmit.textContent = "Submit";
    userNameSubmit.addEventListener("click", function() {
        userNameHighScore.textContent = userName.value + ": " + timerNum;
        highScore();
    });
    // quizCard.appendChild(userName);
    // userName.appendChild("input");
}

// shows high scores
function highScore() {
    quizCard.removeChild(scoreMessage);
    quizCard.removeChild(userName);
    quizCard.removeChild(userNameSubmit);
    
    qText.textContent = "High Scores:";
    // divs that have scores
    quizCard.appendChild(userNameHighScore);

    // adds a button to restart the quiz
    quizCard.appendChild(bStart);
    bStart.addEventListener("click", function() {
        quizCard.removeChild(userNameHighScore);
    })
}

// shows "Correct!" above card for 2 seconds
function correct() {
    document.querySelector("main").appendChild(correctOrIncorrect);
    correctOrIncorrect.textContent = "Correct!";
    var showTime = 2;
    var timerInterval = setInterval(function() {
        showTime--;
    
        if(showTime === 0) {
          clearInterval(timerInterval);
          correctOrIncorrect.textContent = "";
          document.querySelector("main").removeChild(correctOrIncorrect);
        }
      }, 1000);
}
// shows "Incorrect!" above card for 2 seconds + subtracts 10 from timer
function incorrect() {
    timerNum -= 10;
    // if timer is less than 0, set it to 0
    if (timerNum < 0) {
        timerNum = 0;
        timerText.textContent = timerNum;
    }
    document.querySelector("main").appendChild(correctOrIncorrect);
    correctOrIncorrect.textContent = "Incorrect!";
    var showTime = 2;
    var timerInterval = setInterval(function() {
        showTime--;
    
        if(showTime === 0) {
          clearInterval(timerInterval);
          correctOrIncorrect.textContent = "";
          document.querySelector("main").removeChild(correctOrIncorrect);
        }
      }, 1000);
}

// press button to begin quiz
bStart.addEventListener("click", function() {
    startTimer();
    startQuiz();
});