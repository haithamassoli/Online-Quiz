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

let counter = 0;
function next() {
  fetch("../questions.json")
    .then((data) => data.json())
    .then((data) => {
      // console.log(data[counter].options[counter]);
      title.innerHTML = data[counter].title;
      que_text.innerHTML = data[counter].question;

      for (i = 0; i < 4; i++) {
        const label = document.createElement("label");
        label.setAttribute("class", "option");
        option_list.appendChild(label);
        label.innerHTML = data[counter].options[i];
      }
    });
}
next();
function labelText() {}

start_btn.addEventListener("click", () => {
  quiz_box.classList.add("activeQuiz");
  next_btn.style.opacity = 1;
  next_btn.style.pointerEvents = "painted";
});

next_btn.addEventListener("click", () => {
  const labelText = document.querySelectorAll(".option");
  que_text.innerHTML = "";
  labelText.forEach((e) => {
    console.log(e.innerHTML);
    e.remove();
  });
  counter++;
  next();
});
