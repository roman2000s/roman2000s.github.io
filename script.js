if (navigator.serviceWorker) {
    navigator.serviceWorker.register('sw.js', { scope: '' })
}
let start = document.querySelector(".start");
let buttonDisQuestion = document.querySelector(".nextQuestion");
buttonDisQuestion.style.display = 'none';
start.addEventListener("click", quiz);
let score = document.querySelector(".score");
score.innerText=`ДОБРО ПОЖАЛОВАТЬ!`;
function quiz() {
    let points = 0;
    let ranQuestion;
    let answerUser;
    buttonDisQuestion.style.display = 'block';
    let question = document.querySelector(".question");
    let answer = document.querySelector(".answer");
    let button = document.querySelector(".button");
    button.addEventListener("click", nextQuestion);
    start.classList.toggle("startDis");
    score.innerText='';

    function Question(question, answers, correct) {
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }

    let q1 = new Question('Минск - столица Беларуси?',
        ['Да', 'Нет'],
        'Да');
    let q2 = new Question('Главный проспект города Минска?',
        ['Победителей', 'Рокоссовского', 'Независимости'],
        'Независимости');
    let q3 = new Question('Каковы впечатления после посещения столицы Беларуси?',
        ['Скучно', 'Устал', 'Класс', 'Так себе'],
        'Класс');
    let q4 = new Question('Сколько человек проживает в городе Минске?',
        ['2млн человек', '1млн человек', '10тыс. человек'],
        '2млн человек');

    let questions = [q1, q2, q3, q4];
    let questionsShowing = questions.slice();
    score.classList.toggle("scoreDis");
    function shuffle(arr) {
        let j, temp;
        for (var i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
        return arr;
    }
    Question.prototype.displayQuestion = function () {
        let answersShow = [];
        question.innerText = this.question;
        for (var i = 0; i < this.answers.length; i++) {
            answersShow.push(`<label>
            <input type="radio" name="answer"> ${this.answers[i]}
          </label>`);
            shuffle(answersShow);
            answer.innerHTML = answersShow.join("");
        }
    }
    disableButton(false);

    Question.prototype.checkAnswer = function () {
        getQuestionAnswer();
        if (answerUser == this.correct) {
            points += 1;
        }
    }

    function getQuestionAnswer() {
        answerUser = '';
        let arrInput = document.querySelectorAll("label>input");
        for (let i = 0; i < arrInput.length; i++) {
            if (arrInput[i].checked) {

                answerUser += document.querySelectorAll("label")[i].innerText;
            }
        };
        answerUser = answerUser.slice(1);
    }

    function displayPoints() {
        if (points == questions.length) {
            score.innerText = `Поздравляем! Вы правильно ответили на ${points} из ${questions.length} вопросов`;
            score.classList.toggle("scoreDis")
        }
        else {
            score.innerText = `Необходимо еще готовиться! Вы правильно ответили на ${points} из ${questions.length} вопросов`;
            score.classList.toggle("scoreDis")
        }
    }

    function randomNumber() {
        return ranQuestion = Math.floor(Math.random() * questionsShowing.length);
    }

    randomNumber();
    questionsShowing[ranQuestion].displayQuestion();

    function disableButton(status) {
        button.disabled = status;
    }

    function nextQuestion() {
        questionsShowing[ranQuestion].checkAnswer();
        questionsShowing.splice(ranQuestion, 1);
        if (questionsShowing.length !== 0) {
            randomNumber();
            questionsShowing[ranQuestion].displayQuestion();
        }
        else {
            disableButton(true);
            displayPoints();
            start.classList.toggle("startDis");
        }

    }

};

