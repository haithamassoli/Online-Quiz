
let emailInput = document.querySelector(".email-input");
let nameInput = document.querySelector(".full-name-input");
let passWord = document.querySelector(".password-input");
let confirmPass = document.querySelector(".conf-password-input");


let signUp = document.querySelector(".signup-button");


let emailError = document.querySelector(".email-error");
let nameError = document.querySelector(".name-error");
let passError = document.querySelector(".pass-error");
let passConfirmationError = document.querySelector(".pass-confirmation-error");

let quizLink = document.querySelector(".quiz-link").classList.add("quiz-link-disable");

let mistake;

let emailRegex =  /^[a-zA-Z0-9._-]+@(hotmail|gmail|yahoo).com$/;
let passRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
let nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

function show(message){
    if(mistake === "emailInput"){
        emailError.innerText = message;
    }else if(mistake === "nameInput"){
        nameError.innerText = message;
    }else if(mistake === "passWord"){
        passError.innerText = message;
    }else if(mistake === "confirmPass"){
        passConfirmationError.innerText = message;
    }
}

function checkEmpty(){
  try{
      if(emailInput.value === "") {
           mistake = "emailInput";
       }else if(nameInput.value === ""){
            mistake = "nameInput";
       }else if(passWord.value === ""){
            mistake = "passWord";
       }else if(confirmPass.value === ""){
            mistake = "confirmPass";
       }

      throw "this fieled is required";
    } catch(error){
            show(error);
    }
}

emailInput.addEventListener("blur" , validation);
nameInput.addEventListener("blur" , validation);
passWord.addEventListener("blur" , validation);
confirmPass.addEventListener("blur" , validation);


// new validation
function validation(){
    try{
        if(emailInput.value != ""){
            if(emailRegex.test(emailInput.value)){
                emailError.innerText = "";
            }else{
                throw "this email is the wrong format";
            }

        }else{
            checkEmpty();
        }
        if(nameInput.value != ""){
            if(nameRegex.test(nameInput.value)){
                nameError.innerText = "";
            }else{
                throw "the name should not have numbers";
            }

        }else{
            checkEmpty();
        }

        if(passWord.value != ""){
            if(passRegex.test(passWord.value)){
                passError.innerText = "";
            }else{
                throw "the password needs to be fixed";
            }

        }else{
            checkEmpty();
        }
        if(confirmPass.value != ""){
            if(confirmPass.value === passWord.value){
                passError.innerText = "";
            }else{
                throw "password dont match";
            }

        }else{
            checkEmpty();
        }


    }catch(error){
        show(error);
    }
    
}


// end of new validation





let avatar = document.querySelectorAll(".mini-avatar");
let image;
avatar.forEach(element => {
    element.addEventListener("click", () =>{
image=element.src;
})
});

signUp.addEventListener("click" , () =>{
    localStorage.setItem("userAvatar", image);
    
    localStorage.setItem("email", emailInput.value);
    localStorage.setItem("password", passWord.value);
    localStorage.setItem("name", nameInput.value);
});



