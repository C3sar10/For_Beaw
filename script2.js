const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')
const goBack = document.getElementById('goBack')
const showButton = document.getElementById('showButton');
const textContainer = document.getElementById('textContainer');
const startGameButton = document.getElementById('startGame');
const questionContainer = document.getElementById('questionContainer');
const questionText = document.getElementById('questionText');
const answersContainer = document.getElementById('answersContainer')
const answerButtons = document.querySelectorAll('.answerButton');
const scoreText = document.getElementById('scoreText');
const prizeText = document.getElementById('prizeText')

let currentQuestionIndex = 0;
let score = 0;

const questions = [
    {
      question: "Question 1: What is Beaw's favorite cereal to eat?",
      answers: ['Cinammon Toast Crunch', 'Fruit Loops', 'Fruity Pebbles', 'Cookie Crisps'],
      correctAnswer: 2
    },
    {
      question: 'Question 2: How long have da Beaws known each other for?',
      answers: ['8 months', '9 months', '10 months', '11 months'],
      correctAnswer: 2
    },
    {
        question: 'Question 3: Where did the Beaws have their dinner during their Valentines Dance date?',
        answers: ['Shake Shack', 'Regents', 'In-n-out', 'SeaSide Cafe'],
        correctAnswer: 0
      },
      {
        question: 'Question 4: What was the first meal Beaw made for mama Beaw?',
        answers: ['Tinga', 'Chicken and rice', 'Sliders', 'Chicken and Pasta'],
        correctAnswer: 3
      },
      {
        question: 'Question 5: What name did Beaw give to his triceratops?',
        answers: ['Firulais', 'Thanos', 'Ruben', 'Juan'],
        correctAnswer: 1
      },
      {
        question: "Question 6: After what date did Beaws have their first sleepover?",
        answers: ['Study Date', 'Movie Date', 'Picnic Date', 'Lunch Date'],
        correctAnswer: 1
      },
      {
        question: 'Question 7: How many pets has Beaw had in his lifetime?',
        answers: ['0', '1', '2', '3'],
        correctAnswer: 1
      },
      {
          question: 'Question 8: What is beaws birthday?',
          answers: ['May 5', 'May 6', 'May 8', 'May 12'],
          correctAnswer: 2
        },
        {
          question: "Question 9: What is Beaw's favorite food to eat?",
          answers: ['tinga', 'pasta', 'tortas', 'pizza'],
          correctAnswer: 3
        },
        {
          question: 'Question 10: How much does Beaw love mama Beaw?',
          answers: ['A little', 'A decent amount', 'A good amount', 'A Lot. Like Dinosaur'],
          correctAnswer: 3
        }
  ];
  
    
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabTarget)
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('active')
        })
            tabs.forEach(tab => {
                tab.classList.remove('active')
        })
            tab.classList.add('active')
            target.classList.add('active')
        })
    })

goBack.addEventListener('click', (e) => {
        window.location.href = 'index.html'
        })
        
// Add event listener to the button
showButton.addEventListener('click', () => {
    // Toggle the 'show' class on the text container
    textContainer.classList.toggle('show');

    if (textContainer.classList.contains('show')) {
        showButton.textContent = 'Hide Letter';
    } else {
        showButton.textContent = 'Show Letter';
    }
});


startGameButton.addEventListener('click', startGame());

function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  startGameButton.classList.add('hidden');
  questionContainer.classList.remove('hidden');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionText.textContent = question.question;
  answerButtons.forEach((button, index) => {
    button.textContent = question.answers[index];
    button.addEventListener('click', selectAnswer);
  });
}

function resetState() {
  answerButtons.forEach(button => {
    button.classList.remove('correct', 'wrong');
    button.removeEventListener('click', selectAnswer);
  });
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.answer == questions[currentQuestionIndex].correctAnswer;
  if (correct) {
    selectedButton.classList.add('correct');
    score++;
  } else {
    selectedButton.classList.add('wrong');
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    setTimeout(setNextQuestion, 1000);
  } else {
    endGame();
  }
}

function endGame() {
  questionText.textContent = 'Game Over!';
  scoreText.textContent = `Score: ${score}`;
  if (score > 9) {
    prizeText.textContent = 'You have won an all paid date with beaw good for one full day of fun with your choice of location, activities, and clothing style!'
  } else if (score > 7) {
    prizeText.textContent = 'You have won a dinner date with beaw good for one dinner at any participating locations! (Speak to owner for clarificaiton)'
  } else if (score > 5) {
    prizeText.textContent = 'You have won a sweet treat date with beaw good for one sweet treat at any participating locations! (Speak to owner for clarificaiton)'
  } else {
    prizeText.textContent = 'You have won an unlimited amount of hugs and kithes from beaw that can be redeemed at any time!'
  }
  
}

function resetGame() {
    startGameButton.classList.remove('hidden');
    scoreText.textContent = '';
  }