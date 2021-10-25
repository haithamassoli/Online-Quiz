const submit_Button = document.querySelector(".submit-btn");
const question = document.querySelector(".question");
const allAnswers = document.querySelector(".all-answers");
const spans = document.querySelector(".spans");
const container = document.querySelector(".quiz-container");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const input = document.querySelectorAll("input");
const quizName = document.querySelector(".quiz-name");
const info_box = document.querySelector(".info_box");
const quizContainer = document.querySelector(".quiz-container");
const continue_btn = info_box.querySelector(".buttons .restart");
const Show_Answer = document.querySelector(".Show_Answer");
const result_box = document.querySelector(".result_box");
const score_text = document.querySelector(".score_text");

let largeDiv = document.createElement("div");
let userAnswer;
let numOfQuestion = 0;
let right_answer;
let correct = 0;
let user_answers = [];
let right_answers = [];
let options;
let quiz_number = JSON.parse(localStorage.getItem("quiz_number"));
const questionsNum = document.querySelector(".questionsNum");
let number_of_passed_quizzes = 0;
let average_point = 0;
let number_of_all_user_quizzes = 0;

continue_btn.addEventListener("click", () => {
  info_box.classList.remove("activeInfo");
  quizContainer.classList.add("active");
  startTimer(15);
});

Show_Answer.addEventListener("click", () => {
  result_box.classList.remove("activeResult");
  quizContainer.classList.add("active");
});

function loadQuestions(number) {
  if (number < 5) {
    fetch(
      "https://raw.githubusercontent.com/SaharZahran/Online_Quiz_Website/main/quiz_questions.json"
    )
      .then((response) => response.json())
      .then((data) => {
        quizName.innerHTML = data[quiz_number][0].name;
        options = data[quiz_number][number].options;
        addQuestion(options, data[quiz_number][number].Question);
        createBullets(number);
        right_answer = data[quiz_number][number].right_answer;
      });
  }
}
loadQuestions(numOfQuestion);
submit_Button.addEventListener("click", () => {
  checkRightAnswer(right_answer);
  setTimeout(() => {
    numOfQuestion++;
    reset();
    loadQuestions(numOfQuestion);
    if (numOfQuestion > 4) {
      ++number_of_all_user_quizzes;
      loadResult();
      quizContainer.classList.remove("active");
      result_box.classList.add("activeResult");
      calculation();
      numOfQuestion = 0;
      correct = 0;
      clearInterval(counter);
    }
    clearInterval(counter);
    startTimer(15);
  }, 700);
});

function createBullets(numOfQuestion) {
  for (let i = 0; i <= 4; i++) {
    const span = document.createElement("span");
    spans.appendChild(span);
    if (i === numOfQuestion) {
      span.classList.add("active-question");
    }
  }
}

score_text.innerHTML = `${correct >= 3 ? "perfect" : "Hard luck"} ${correct}`;

function loadResult() {
  fetch(
    "https://raw.githubusercontent.com/SaharZahran/Online_Quiz_Website/main/quiz_questions.json"
  )
    .then((response) => response.json())
    .then((data) => {
      clearInterval(counter);
      container.innerHTML = "";
      let counterResult = 0;
      let quizName = `<h1>${data[quiz_number][0].name}</h1>`;
      container.insertAdjacentHTML("beforeend", quizName);
      for (let i = 0; i < data[quiz_number].length; i++) {
        container.appendChild(largeDiv);
        largeDiv.classList.add("largeDiv");
        let h3 = document.createElement("h3");
        let div = document.createElement("div");
        largeDiv.appendChild(div);
        div.classList.add("qusContainer");
        h3.innerHTML = data[quiz_number][counterResult]["Question"];
        counterResult++;
        div.appendChild(h3);
        for (let j = 0; j < data[quiz_number][i].options.length; j++) {
          let label = document.createElement("label");
          label.classList.add("resultLabel");
          label.innerHTML = data[quiz_number][i].options[j];
          div.append(label);

          let resultArr = localStorage.getItem("user-answers").split(",");
          if (
            data[quiz_number][i].options[j] == data[quiz_number][i].right_answer
          ) {
            label.classList.add("correct");
          } else {
            label.classList.add("incorrect");
          }
        }
      }
    });
}

function addQuestion(arrayOfOptions, number_of_question) {
  const questionText = document.createElement("h2");
  questionText.textContent = number_of_question;
  question.appendChild(questionText);

  for (let i = 0; i <= 3; i++) {
    const answer = document.createElement("div");
    answer.classList.add("answer");
    const input = document.createElement("input");
    input.name = "answer";
    input.type = "radio";
    input.className = "inputRadio";
    input.id = `answer${i}`;
    const label = document.createElement("label");
    label.setAttribute("for", `answer${i}`);
    label.textContent = arrayOfOptions[i];
    answer.appendChild(input);
    answer.appendChild(label);
    allAnswers.appendChild(answer);
  }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function checkRightAnswer(correct_answer) {
  const inputAnswers = document.querySelectorAll("input");
  let userAnswer;
  inputAnswers.forEach((input) => {
    if (input.checked) {
      userAnswer = input.nextElementSibling.innerHTML;
      right_answers.push(correct_answer);
      user_answers.push(userAnswer);
      storeResult();
      if (userAnswer !== correct_answer) {
        input.nextElementSibling.style.color = "#721c24";
        input.nextElementSibling.style.background = "#f8d7da";
        input.nextElementSibling.style.border = "1px solid #f5c6cb";
        input.insertAdjacentHTML("afterend", crossIconTag);
      } else {
        input.nextElementSibling.style.color = "#155724";
        input.nextElementSibling.style.background = "#d4edda";
        input.nextElementSibling.style.border = "1px solid #c3e6cb";
        input.insertAdjacentHTML("afterend", tickIconTag);
        correct++;
      }
    }
  });
}

function reset() {
  allAnswers.innerText = "";
  spans.innerText = "";
  question.innerText = "";
  userAnswer = "";
  right_answer = "";
}

function storeResult() {
  localStorage.setItem("user-answers", user_answers);
  localStorage.setItem("right-answers", right_answers);
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero; //add a 0 before time value
    }
    if (time < 0) {
      clearInterval(counter); //clear counter
      timeText.textContent = "Time Off";
      reset();
      numOfQuestion++;
      loadQuestions(numOfQuestion);
      startTimer(15);
      numOfQuestion > 4 ? loadResult() : "";
    }
  }
}
