// Define javascript variables that access DOM elements
const startBtn = document.getElementById("start-quiz-btn");
var quizContent = document.getElementById("quiz-content");
var quiz = document.getElementById("quiz");
var timerEl = document.getElementById("timer");
var feedBack = document.createElement("span");
if(localStorage.getItem('scores')==="") {
    var scores = [];
}
else {
    var scores = JSON.parse(localStorage.getItem('scores'));
}

//define javascript variables
var score = 0;
var timer = 60;
var currentQuestion = 0;

//Starting Parameters
timerEl.innerHTML = timer

//quiz questions
const quizQuestion = [{
    question: "Question 1: Who is my favorite person?",
    answers: ["Anna", "Jeff", "Ron", "Russ"],
    correctAnswer: 0,
    },

    {question: "Question 2: Who is my favorite dog?",
    answers: ["Ralph", "Nasty Neighbor Dogs", "Lilly", "Niko"],
    correctAnswer: 3,
    },

    {question: "Question 3: What do I like to do most with Anna?",
    answers: ["Cuddle", "Run", "Tell her she's pretty", "Eat food"],
    correctAnswer: 0,
    },

    {question: "Question 4: What is my favorite food?",
    answers: ["Burritos", "Salmon", "Lettuce", "Kale"],
    correctAnswer: 1,
    },
]


//Function for removing and adding elements upon starting the quiz
initializeQuiz = function() {
    quizContent.removeChild(startBtn);
    quizContent.removeChild(quizContent.getElementsByTagName("p")[0]);
    quiz.appendChild(feedBack);
    quiz.getElementsByTagName("span")[0].classList.add("flex-box", "w-100", "flex-center",)    
    countdown();
};

//remove previous quiz questions
clearQuizContent = function() {
    for(i=0; i<quizQuestion[currentQuestion].answers.length; i++) {
        quizContent.removeChild(quizContent.getElementsByTagName("button")[0]);
    };
};

endGame = function () {
    //prompt tells user they are done with the quiz
    quizContent.firstElementChild.innerText = "All done!";

    //constants to build html for end of game sequence
    const finalScore = document.createElement("span");
    const initialsInput = document.createElement("input");
    const requestInitials = document.createElement("label");
    const initialsSubmit = document.createElement("button");

    //attributes for input and label
    initialsInput.setAttribute("name", "initials")
    initialsInput.setAttribute("id", "initials")
    requestInitials.setAttribute("for", "initials")

    //text for end of game html elements
    finalScore.innerHTML = "Your final score is: " + score;
    requestInitials.innerHTML = "Enter initials:";
    initialsSubmit.innerHTML = "submit";

    //styles for end game html elements
    finalScore.classList.add("flex-box", "width-100", "flex-center")

    //append end of game html elements to the DOM
    quizContent.appendChild(finalScore);
    quizContent.appendChild(requestInitials);
    quizContent.appendChild(initialsInput);
    quizContent.appendChild(initialsSubmit);

    //Upon submission of initials create score object with initials and associated score, push object to scores array
    initialsSubmit.addEventListener("click", function() {
        var playerScore = {
            player: document.getElementById("initials").value,
            score: score,
        };
        console.log(playerScore)
        scores.push(playerScore);
        localStorage.setItem('scores', JSON.stringify(scores));
    })

     
}

//Function that creates quiz questions and determines if answer is correct
populateQuestions = function() {
    quizContent.firstElementChild.innerText = quizQuestion[currentQuestion].question;
    quizContent.firstElementChild.classList.add("quiz-question")
    //for loop populates quiz question answers
    for(i=0; i<quizQuestion[currentQuestion].answers.length; i++) {
        var answerButton = document.createElement("button");
        //set answer button text to question text
        answerButton.innerHTML = quizQuestion[currentQuestion].answers[i];
        //append answer button to the quiz content div
        quizContent.appendChild(answerButton);
        //give the button an attribute for checking if it's right
        answerButton.setAttribute("id", i)
        //listen for which button is clicked
        answerButton.addEventListener('click', function() {
            if(this.id == quizQuestion[currentQuestion].correctAnswer) {
                score++;
                feedBack.innerHTML = "You answered question " + (currentQuestion+1) + " correctly.";
                if(currentQuestion<quizQuestion.length -1) {
                    currentQuestion++
                    clearQuizContent()
                    populateQuestions()
                }
                else {
                    clearQuizContent()
                    endGame()
                }
            }
            else {
                timer -= 10;
                feedBack.innerHTML = "You answered question " + (currentQuestion+1) + " incorrectly";
                if(currentQuestion<quizQuestion.length -1) {
                    currentQuestion++
                    clearQuizContent()
                    populateQuestions()
                }
                else {
                    clearQuizContent()
                    endGame()
                }
            }
            // check length and stop iterating if the questions are done
            if(quizQuestion[currentQuestion]>quizQuestion.length) {   
            }
        });
    };

};

//function for countdown
countdown = function() {
    setInterval(function() {
        timer--;
        timerEl.innerHTML = timer
        if(timer===0) {
            clearQuizContent();
            endGame();
            clearInterval(countdown);
        }
    },
    1000);
};

//Event listener for start quiz button
startBtn.addEventListener("click", populateQuestions);
startBtn.addEventListener("click", initializeQuiz);