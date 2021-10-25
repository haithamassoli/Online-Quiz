const start_btns = document.querySelectorAll(".start-btn");
const profileImage = document.getElementById("profile");
const username = document.getElementById("username");

let number_of_quiz;
start_btns.forEach((btn, index) => {
	btn.addEventListener("click", () => {
		number_of_quiz = "Quiz" + (index + 1);
		if (localStorage.getItem("quiz_number") === "") {
			localStorage.setItem("quiz_number", JSON.stringify(number_of_quiz));
		} else {
			localStorage.removeItem("quiz_number");
			localStorage.setItem("quiz_number", JSON.stringify(number_of_quiz));
		}
	});
});
profileImage.src = localStorage.getItem("userAvatar");
username.innerHTML = localStorage.getItem("name");
