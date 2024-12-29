//Selector variables
const questionNode = document.getElementById('question');
const answerNode = document.getElementById('answer');
const markQuestionNode = document.getElementById('markQuestion');
const showAnswerNode = document.getElementById('showAnswer');
const questionHistory = document.getElementById('questionHistory');
let questions = [];
let counter = 0;
let wrongCount = 0;

//Event Listeners
document.getElementById('submit').addEventListener(
  'click',
  event => {
    event.preventDefault();
    document.getElementById('quizSetup').classList.add('d-none');
    document.getElementById('currentQuestion').classList.remove('d-none');
    quizInit();
  },
  false
);


function showAnswerEvents() {
  const iframeAnswer = answerNode.querySelector('iframe');
  if (markQuestionNode.classList.contains('d-none')) {
    iframeAnswer.style.display = 'block';
    answerNode.classList.remove('d-none');
    // console.log('condition true for display');
    showAnswerNode.innerHTML = 'Hide Answer';
    markQuestionNode.classList.remove('d-none'); // Show the Correct/Wrong buttons
  } else {
    iframeAnswer.style.display = 'none';
    showAnswerNode.innerHTML = 'Show Answer';
    markQuestionNode.classList.add('d-none'); // Hide the Correct/Wrong buttons
  }
}


function quizInit() {
  displayTime();
  createQuestion();
  markQuestionNode.classList.add('d-none');
  renderQuestion(questions[counter]);
}

function markAnswer(value) {
  if (value == 'wrong') {
    addToHistory(questions[counter]);
    wrongCount++;
  }
  //move to the next question
  counter++;
  if (counter < questions.length) {
    renderQuestion(questions[counter]);
    showAnswerEvents();
  } else {
    document.getElementById('currentQuestion').classList.add('d-none');
    if (wrongCount > 0) {
      questionHistory.classList.remove('d-none');
    }
    else {
      document.getElementById('perfectScore').classList.remove('d-none');
    }
    document.getElementById('newQuiz').classList.remove('d-none');
  }
}

// Paths to question and answer directories
const questionPath = './Renal, Urinary Systems & Electrolytes/Questions/';
const answerPath = './Renal, Urinary Systems & Electrolytes/Answers/';

function createQuestion() {
  const noOfQuestions = document.getElementById('noOfQuestions').value;
  const totalQuestions = 208; // Adjust this to the total number of questions available

  for (let i = 0; i < noOfQuestions; i++) {
    let random = Math.floor(Math.random() * totalQuestions) + 1;

    // Push question and answer paths into the `questions` array
    questions.push([
      `${questionPath}Renal, Urinary Systems & Electrolytes_Question_${random}.pdf`,
      `${answerPath}Renal, Urinary Systems & Electrolytes_Answer_${random}.pdf`,
    ]);
  }
}

function ensurePdfLoaded(iframe, src) {
  iframe.addEventListener('load', () => {
    // console.log(`PDF successfully loaded: ${src}`);
  });

  iframe.addEventListener('error', () => {
    console.error(`Failed to load PDF: ${src}`);
    iframe.src = ''; // Clear the src to reset iframe
    setTimeout(() => iframe.src = src, 2000); // Retry loading
  });
}


function renderQuestion(value) {
  const questionIframe = document.createElement('iframe');
  questionIframe.src = value[0];
  questionIframe.width = "100%";
  questionIframe.height = "400px";
  
  const answerIframe = document.createElement('iframe');
  answerIframe.src = value[1];
  answerIframe.width = "100%";
  answerIframe.height = "400px";
  answerIframe.style.display = "none";

  questionNode.innerHTML = '';
  answerNode.innerHTML = '';

  questionNode.appendChild(questionIframe);
  answerNode.appendChild(answerIframe);

  // Ensure PDFs are loaded
  ensurePdfLoaded(questionIframe, value[0]);
  ensurePdfLoaded(answerIframe, value[1]);
}


function addToHistory([quest, ans]) {
  let container = document.createElement('div');
  let questNode = document.createElement('p');
  let ansNode = document.createElement('p');
  questNode.innerHTML = `<b>${quest}</b>`;
  ansNode.innerHTML = ans;
  container.append(questNode, ansNode);
  questionHistory.append(container);
}

/*
function renderQuestion(value) {
  questionNode.innerHTML = `<iframe src="${value[0]}" width="100%" height="400px"></iframe>`;
  answerNode.innerHTML = `<iframe src="${value[1]}" width="100%" height="400px"></iframe>`;
  //showAnswerEvents();
}

function showAnswerEvents() {
  const iframeAnswer = answerNode.querySelector('iframe');
  if (showAnswerNode.classList.contains('d-none')) {
    showAnswerNode.classList.remove('d-none');
    answerNode.classList.add('d-none');
    markQuestionNode.classList.add('d-none');
    iframeAnswer.style.display = 'block';
  } else {
    showAnswerNode.classList.add('d-none');
    answerNode.classList.remove('d-none');
    markQuestionNode.classList.remove('d-none');
    iframeAnswer.style.display = 'none';
  }
}


function createQuestion() {
  const noOfQuestions = document.getElementById('noOfQuestions').value;
  const max = data.length;
  for (let i = 0; i < noOfQuestions; i++) {
    let random = Math.floor(Math.random() * (max - 0)) + 0;
    if (!questions.includes(random)) {
      questions.push(data[random]);
    } else {
      random = Math.floor(Math.random() * (max - 0)) + 0;
      questions.push(data[random]);
    }
  }
}

function renderQuestion(value) {
  questionNode.innerHTML = `<b>${counter+1}. ${value[0]}</b>`;
  answerNode.innerHTML = value[1];
}
*/

const displayTime = () => {
  let quizTime = document.getElementById('quizTime').value;
  const timerNode = document.getElementById('timer');
  console.log('TimeStart');
  if (quizTime > 1) {
    timerNode.style.display = 'inline-block';
    const timer = setInterval(() => {
      quizTime--;
      let min = `0${Math.floor(quizTime / 60)}`;
      let sec = `0${quizTime % 60}`;
      timerNode.innerHTML = `${min.slice(-2)} : ${sec.slice(-2)}`;
      if (quizTime == 0) {
        clearInterval(timer);
      }
    }, 1000);
    console.log('TimeEnd');
  }
}; 



