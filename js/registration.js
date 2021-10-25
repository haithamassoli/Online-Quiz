let email = document.getElementById("email");
let nameuser = document.getElementById("name");
let password = document.getElementById("password");
let confirmPass = document.getElementById("password-confirm");

let imageRadio = document.querySelector(".checkbox");

let signUp = document.getElementById("signup");
let errors = document.querySelectorAll(".error");

function removeError(err) {
	err.innerHTML = "";
}

email.addEventListener("blur", (e) => {
	try {
		if (e.target.value === "") throw "The email shouldn't be empty!";
		if (e.target.value !== "") removeError(errors[0]);
		if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value))
			throw "You have entered an invalid email address!";
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value))
			removeError(errors[0]);
	} catch (error) {
		errors[0].innerHTML = error;
	}
});
nameuser.addEventListener("blur", (e) => {
	try {
		if (e.target.value === "") throw "The name shouldn't be empty!";
		if (e.target.value !== "") removeError(errors[1]);
		if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(e.target.value))
			throw "You have entered an invalid name";
		if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(e.target.value))
			removeError(errors[1]);
	} catch (error) {
		errors[1].innerHTML = error;
	}
});
password.addEventListener("blur", (e) => {
	try {
		if (e.target.value === "") throw "The password shouldn't be empty!";
		if (e.target.value !== "") removeError(errors[2]);
		if (
			!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[@$!%*#?&])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,18}$/.test(
				e.target.value
			)
		)
			throw "A password contains at least 6 characters, one number, lower and uppercase letters and special characters";
		if (
			/^(?=.*[A-Z])(?=.*[a-z])(?=.*[@$!%*#?&])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,18}$/.test(
				e.target.value
			)
		)
			removeError(errors[3]);
	} catch (error) {
		errors[3].innerHTML = error;
	}
});
confirmPass.addEventListener("blur", (e) => {
	try {
		if (e.target.value === "") throw "The password shouldn't be empty!";
		if (e.target.value !== "") removeError(errors[4]);
		if (confirmPass.value != password.value) throw "password don't match";
		if (confirmPass.value === password.value) removeError(errors[4]);
	} catch (error) {
		errors[4].innerHTML = error;
	}
});

let avatar = document.querySelectorAll(".mini-avatar");
let image;
avatar.forEach((element) => {
	element.addEventListener("click", (e) => {
		image = e.target.src;
	});
});

signUp.addEventListener("click", () => {
	email.value == ""
		? (errors[0].innerHTML = "The email shouldn't be empty!")
		: "";
	nameuser.value == ""
		? (errors[1].innerHTML = "The name shouldn't be empty!")
		: "";
	password.value == ""
		? (errors[3].innerHTML = "The password shouldn't be empty!")
		: "";
	confirmPass.value == ""
		? (errors[4].innerHTML = "The password shouldn't be empty!")
		: "";
	imageRadio.checked == false
		? (errors[2].innerHTML = "please make sure to select an image")
		: "";
	console.log(imageRadio.checked);
	if (
		email.value != "" &&
		nameuser.value != "" &&
		password.value != "" &&
		confirmPass.value != "" &&
		image.value != "" &&
		confirmPass.value == password.value
	) {
		localStorage.setItem("userAvatar", image);
		localStorage.setItem("email", email.value);
		localStorage.setItem("password", password.value);
		localStorage.setItem("name", nameuser.value);
		window.open("login.html", "_self");
	}
});
