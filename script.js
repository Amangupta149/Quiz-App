const questions = [
    {
        question: "What is the pH value of the human body?",
        answers: [
            { text: "9.2 to 9.8", correct: "false" },
            { text: "7.0 to 7.8", correct: "true" },
            { text: "6.1 to 6.3", correct: "false" },
            { text: "5.4 to 5.6", correct: "false" }
        ]
    },

    {
        question: "Right to emergency medical aid is?",
        answers: [
            { text: "legal right", correct: "false" },
            { text: "illegal right", correct: "false" },
            { text: "constitutional right", correct: "false" },
            { text: "fundamental right", correct: "true" }
        ]
    },

    {
        question: "Which among them is the nearest to the earth planet?",
        answers: [
            { text: "mercury", correct: "false" },
            { text: "mars", correct: "false" },
            { text: "venus", correct: "true" },
            { text: "naptune", correct: "false" }
        ]
    },

    {
        question: "Rate this app",
        answers: [
            { text: "1 - 3", correct: "false" },
            { text: "3 - 6", correct: "false" },
            { text: "6 - 9", correct: "false" },
            { text: "10", correct: "true" }
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButton = document.getElementById("ans-btn");
const nextButton = document.getElementById("btn-next");



let currentQuestionIndex = 0;
let score = 0;


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion()
}

function showQuestion() {
    resetstate();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetstate() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);

    }
}
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextButton.style.display = "block";
}
function showScore() {
    resetstate();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion()
    } else {
        showScore();
    }
}
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();
