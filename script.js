// Quiz questions as objects

var questions = [{
    question: "Question 1: What does CSS stand for?",
    choices: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Cascading Style Solution"],
    answer: "Cascading Style Sheets"
},

{
    question: "Question 2: How many elements can you apply an 'ID' attribute to?",
    choices: ["3", "As many as you want", "1", "0"],
    answer: "1"
},

{
    question: "Question 3: What is the correct CSS syntax?",
    choices: ["body:color=black;", "{body:color=black;}", "body {color:black;}", "{body;color:black;}"],
    answer: "body {color:black;}"
},

{
    question: "Question 4: How do you select an element with id 'demo'",
    choices: ["#demo", "demo", ".demo", "*demo"],
    answer: "#demo"
},

{
    question: "Question 5: Which of the following function of Array object adds and/or removes elements from an array?",
    choices: ["toSource()", "sort()", "splice()", "unshift()"],
    answer: "splice()"
},

{
    question: "Question 6: An if statement must have an else attached?",
    choices: ["True", "False"],
    answer: "False"
},

{
    question: "Question 7: Which of the following function of String object combines the text of two strings and returns a new string?",
    choices: ["add( )", "concat( )", " merge( )", "append( )"],
    answer: "concat( )"
},

{
    question: "Question 8: Two or more conditions can be added using && and ||",
    choices: ["True", "False"],
    answer: "True"
}
];


// Setting the variables for the timer and score
var score = 0;
var initials = document.getElementById("name");
var currentQuestion = -1;
var timeLeft = 0;
var timer;

// Starts the countdown timer once user clicks 'play'
function play() {

    timeLeft = 90;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function () {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;

        // When timer is below 0, end the game
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);

    next();
}

// Stops the timer to end the game
function endGame() {
    clearInterval(timer);

    var quizContent = `
    <h1>Game over!</h1>
    <h2>You got ` + score + ` /80!</h2>
    <input type="text" id="name" placeholder="Initials"> 
    <button onclick="saveScore()">Save score!</button><button onclick="resetGame()">Play Again!</button><button onclick="viewHighscores()">View leaderboard!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

// Stores the scores on local storage

var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

function saveScore() {

    var allScores = {
        score: score,
        name: document.getElementById('name').value
    };
    highscores.push(allScores);
    console.log(highscores);

    highscores.sort(function (a, b) { return b.score - a.score; });

    localStorage.setItem("highscores", JSON.stringify(highscores));

};


function viewHighscores() {
    var retrieveScores = JSON.parse(localStorage.getItem('highscores'));
    console.log(retrieveScores);

    var leaderBoard = document.createElement("h1");
    leaderBoard.textContent = "Leaderboard!"

    var orderedList = document.createElement("ol");

    for (var i = 0; i < retrieveScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = retrieveScores[i].name + ", " + retrieveScores[i].score;
        orderedList.append(createLi);
    };

    var playAgainBtn = document.createElement("button");
    playAgainBtn.textContent = "Play again!";
    playAgainBtn.onclick = resetGame;

    quizBody.innerHTML = "";
    quizBody.append(leaderBoard);
    quizBody.append(orderedList);
    quizBody.append(playAgainBtn);

}


// Clears the saved scores in the local storage
function clearScore() {
    localStorage.setItem("highscores", "");
    localStorage.setItem("highscoreName", "");

    resetGame();
}

// Resets the game 
function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

    var quizContent = `
    <h1>Coding Quiz!</h1>
    <h3>It's a race against the clock to answer all 8 questions correctly in the fastest time.</h3>
    <button onclick="play()">Play!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

// If a player answers incorrectly, deduct 10 seconds from the timer and add alert

var notificationBox = document.getElementById("notification");

function incorrect() {
    timeLeft -= 10;

    var incorrectNotify = document.createElement("div");
    incorrectNotify.setAttribute("style", "font-size: 12px; color: red; font-weight: bold;");
    incorrectNotify.textContent = "You got the answer wrong!";
    notificationBox.innerHTML = "";
    notificationBox.appendChild(incorrectNotify);
    console.log("incorrect")

    setTimeout(function () {
        notificationBox.innerHTML = ""
    }, 2000);


    next();
}

// If a player answers correctly, increase the score by 10 points and add alert
function correct() {
    score += 10;

    var correctNotify = document.createElement("div");
    correctNotify.setAttribute("style", "font-size: 12px; color: green; font-weight: bold;");
    correctNotify.textContent = "You got the answer right!";
    notificationBox.innerHTML = "";
    notificationBox.appendChild(correctNotify);
    console.log("correct")

    setTimeout(function () {
        notificationBox.innerHTML = ""
    }, 2000);

    next();
}

// Loops through the questions 
function next() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }

    var quizContent = "<h2>" + questions[currentQuestion].question + "</h2>"

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