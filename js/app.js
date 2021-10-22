const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
// const exit_btn = info_box.querySelector(".buttons .quit");
// const continue_btn = info_box.querySelector(".buttons .restart");
const title = document.querySelector(".title");
const quiz_box = document.querySelector(".quiz_box");
const next_btn = document.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const que_text = document.querySelector(".que_text");
const inputBtn = document.querySelectorAll(".inputDel");

let grade = 0;
let counter = 0;
function next() {
  fetch(
    "https://raw.githubusercontent.com/haithamassoli/Online-Quiz/main/questions.json"
  )
    .then((data) => data.json())
    .then((data) => {
      // console.log(data[counter].question);
      title.innerHTML = data[counter].title;
      que_text.innerHTML = data[counter].question;

      for (i = 0; i < 4; i++) {
        input = document.createElement("input");
        label = document.createElement("label");
        input.setAttribute("type", "radio");
        input.setAttribute("class", "inputDel");
        input.setAttribute("id", `number${[i]}`);
        input.setAttribute("name", `${data[counter].question}`);
        input.setAttribute("value", `${data[counter].options[i]}`);
        label.setAttribute("class", "option");
        label.setAttribute("for", `number${[i]}`);
        option_list.appendChild(input);
        option_list.appendChild(label);
        label.innerHTML = data[counter].options[i];
      }
    });
}
next();

function timer_line(sec) {
  line_left = setInterval(function () {
    time_line.style.width = sec + "px";
    if (sec >= 548) clearInterval(line_left);
    sec += 4.575;
  }, 125);
}
function timer_sec(sec) {
  timer_left = setInterval(function () {
    timeCount.innerHTML = sec;
    if (timeCount.innerHTML <= 9) timeCount.innerHTML = `0${sec}`;
    if (timeCount.innerHTML == 0) {
      clearInterval(timer_left);
      timeText.innerHTML = "Time Off";
    }
    sec--;
  }, 1000);
}
start_btn.addEventListener("click", () => {
  quiz_box.classList.add("activeQuiz");
  next_btn.style.opacity = 1;
  next_btn.style.pointerEvents = "painted";
  timer_sec(15);
  timer_line(0);
});

next_btn.addEventListener("click", () => {
  if (counter < 4) {
    const labelText = document.querySelectorAll(".option");
    que_text.innerHTML = "";
    // function getGrade();
    trueFalse();
    labelText.forEach((e) => e.remove());
    clearInterval(line_left);
    clearInterval(timer_left);
    counter++;
    next();
  } else console.log("helllo");
  timer_sec(15);
  timer_line(0);
});

function trueFalse() {
  inputBtn.forEach((e) => console.log("e.target"));
}
