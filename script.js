// Quiz questions as objects

var questions = [{
    title: "Question 1: What does CSS stand for?",
    choices: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Cascading Style Solution"],
    answer: "Cascading Style Sheets"
},

{
    title: "Question 2: How many elements can you apply an 'ID' attribute to?",
    choices: ["3", "As many as you want", "1", "0"],
    answer: "1"
},

{
    title: "Question 3: What is the correct CSS syntax?",
    choices: ["body:color=black;", "{body:color=black;}", "body {color:black;}", "{body;color:black;}"],
    answer: "body {color:black;}"
},

{
    title: "Question 4: How do you select an element with id 'demo'",
    choices: ["#demo", "demo", ".demo", "*demo"],
    answer: "#demo"
},

{
    title: "Question 5: Which of the following function of Array object adds and/or removes elements from an array?",
    choices: ["toSource()", "sort()", "splice()", "unshift()"],
    answer: "splice()"
},

{
    title: "Question 6: An if statement must have an else attached?",
    choices: ["True", "False"],
    answer: "False"
},

{
    title: "Question 7: Which of the following function of String object combines the text of two strings and returns a new string?",
    choices: ["add( )", "concat( )", " merge( )", "append( )"],
    answer: "concat( )"
},

{
    title: "Question 8: Two or more conditions can be added using && and ||",
    choices: ["True", "False"],
    answer: "True"
}
];

// Copied code

//setting the numerical variables for the functions.. scores and timers.. 
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//starts the countdown timer once user clicks the 'start' button
function start() {

    timeLeft = 90;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        //proceed to end the game function when timer is below 0 at any time
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(); 
        }
    }, 1000);

    next();
}

//stop the timer to end the game 
function endGame() {
    clearInterval(timer);

    var quizContent = `
    <h1>Game over!</h1>
    <h2>You got a ` + score +  ` /100!</h2>
    <input type="text" id="name" placeholder="First name"> 
    <button onclick="setScore()">Set score!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//store the scores on local storage
function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName",  document.getElementById('name').value);
    getScore();
}

function getScore() {
    var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 
    
    <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>
    
    `;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//clears the score name and value in the local storage if the user selects 'clear score'
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");

    resetGame();
}

//reset the game 
function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

    var quizContent = `
    <h1>
        JavaScript Quiz!
    </h1>
    <h3>
        Click to play!   
    </h3>
    <button onclick="start()">Start!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//deduct 15seconds from the timer if user chooses an incorrect answer
function incorrect() {
    timeLeft -= 15; 
    next();
}

//increases the score by 20points if the user chooses the correct answer
function correct() {
    score += 20;
    next();
}

//loops through the questions 
function next() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }

    var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }

    document.getElementById("quizBody").innerHTML = quizContent;
}
