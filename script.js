const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffleQuestions,correctQuestionIndex;
let quizScore = 0;


startButton.addEventListener('click',startGame)

nextButton.addEventListener('click',() => {
  correctQuestionIndex++;
  setnextQuestion()
})

function startGame () {
  startButton.classList.add('hide')
  shuffleQuestions = questions.sort(()=>Math.random() -0.5)
  correctQuestionIndex = 0;
  questionContainerElement.classList.remove('hide')
  setnextQuestion()
  quizScore = 0
}

// SECTION HERE PASSED

function setnextQuestion () {
  resetState();
  showQuestion(shuffleQuestions[correctQuestionIndex])
}


// SECTION HERE PASSED

function showQuestion (question) {
  questionElement.innerText = question.question;
  question.answer.forEach((answer) => {
    const button = document.createElement('button')
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button);
  })
}

// SECTION HERE PASSED

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}


// SECTION HERE PASSED

function selectAnswer (e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct

  setStatusClass(document.body,correct)
  Array.from(answerButtonsElement.children).forEach((button)=>{
    setStatusClass(button,button.dataset.correct)
  })
  if (shuffleQuestions.length > correctQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = "restart"
    startButton.classList.remove("hide")
  }
  if (selectedButton.dataset = correct) {
    quizScore ++
  }
  document.getElementById('right-answers').innerText = quizScore
}




// SECTION HERE PASSED 

function setStatusClass (element,correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}
function clearStatusClass(element){
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

const questions = [
  {
    question: 'Which one of these is a JavaScript framework',
    answer: [
      {text: 'Python', correct: false},
      {text: 'Django', correct: false},
      {text: 'React', correct: true},
      {text: 'Eclipse', correct: false}
    ],
  },
  {
    question: 'Who is the prime minister of Singapore',
    answer: [
      {text: 'Lawrence Wong', correct: true},
      {text: 'Anwar Ibrahim', correct: false},
    ],
  },
  {
    question: 'what is 4 + 3 ?',
    answer: [
     {text: '7', correct: true},
     {text: '8', correct: false},
    ],
  }
]