// Define DOM variables
const startBtn = document.getElementById("start-quiz-btn");
var quizContent = document.getElementById("quiz-content");
var quiz = document.getElementById("quiz");
var timerEl = document.getElementById("timer");
var score = 0;
var timer = 60;
var currentQuestion = 0;
var feedBack = document.createElement("span");
const quizQuestion = [{
    question: "Who is my favorite person?",
    answers: ["Anna", "Jeff", "Ron", "Russ"],
    correctAnswer: 0,
    },

    {question: "Who is my favorite dog?",
    answers: ["Ralph", "Nasty Neighbor Dogs", "Lilly", "Niko"],
    correctAnswer: 3,
    },

    {question: "What do I like to do most with Anna?",
    answers: ["Cuddle", "Run", "Tell her she's pretty", "Eat food"],
    correctAnswer: 0,
    },
    
]

//Setting starting parameters

//Function for removing and adding elements upon starting the quiz
initializeQuiz = function() {
quizContent.removeChild(startBtn);
quizContent.removeChild(quizContent.getElementsByTagName("p")[0]);
quiz.appendChild(feedBack);
quiz.getElementsByTagName("span")[0].classList.add("flex-box", "w-100", "flex-center",)
};

clearQuizContent = function() {
    for(i=0; i<quizQuestion[currentQuestion].answers.length; i++) {
        // console.log(quizContent.getElementsByTagName("button")[i])
        quizContent.removeChild(quizContent.getElementsByTagName("button")[0]);
    };
};

endGame = function () {
    
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
                debugger
                score++;
                feedBack.innerHTML = "Correct"
                if(currentQuestion<quizQuestion.length -1) {
                    currentQuestion++
                    clearQuizContent()
                    populateQuestions()
                }
                else {
                    endGame()
                }
            }
            else {
                timer -= 10;
                feedBack.innerHTML = "Wrong"
                if(currentQuestion<quizQuestion.length -1) {
                    currentQuestion++
                    clearQuizContent()
                    populateQuestions()
                }
                else {
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

timerEl.innerHTML = timer

//Event listener for start quiz button
startBtn.addEventListener("click", populateQuestions);
startBtn.addEventListener("click", initializeQuiz);

//radial buttons for quiz questions

//for loop to loop over available questions

//else statement for run out of questions or time