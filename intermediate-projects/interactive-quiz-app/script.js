const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: "Pacific Ocean",
  },
]

let currentQuestionIndex = 0
let score = 0

function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex]
  document.getElementById("question").innerText = currentQuestion.question
  const optionsContainer = document.getElementById("options")
  optionsContainer.innerHTML = ""

  currentQuestion.options.forEach((option) => {
    const li = document.createElement("li")
    li.innerText = option
    li.onclick = selectOption
    optionsContainer.appendChild(li)
  })
}

function selectOption(event) {
  const selectedOption = event.target.innerText
  const currentQuestion = quizData[currentQuestionIndex]
  if (selectedOption === currentQuestion.answer) {
    score++
  }
  currentQuestionIndex++
  if (currentQuestionIndex < quizData.length) {
    loadQuestion()
  } else {
    showResult()
  }
}

function showResult() {
  document.getElementById("quiz-container").classList.add("hidden")
  document.getElementById("score").innerText = `${score} out of ${quizData.length}`
  document.getElementById("result").classList.remove("hidden")
}

function restartQuiz() {
  currentQuestionIndex = 0
  score = 0
  document.getElementById("result").classList.add("hidden")
  document.getElementById("quiz-container").classList.remove("hidden")
  loadQuestion()
}

loadQuestion()
