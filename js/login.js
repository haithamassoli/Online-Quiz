let Email = document.getElementById('email');
        let Password = document.getElementById('password');
        let btn = document.getElementById('btn');
        let check = document.querySelectorAll('.check');

        btn.addEventListener('click', (e) => {
            let currentemail = Email.value;
            console.log(currentemail);
            let currentpassword = Password.value;
            console.log(currentpassword);
            
            if(currentemail === localStorage.getItem('email') && currentpassword === localStorage.getItem('password')){
                window.open("dashboard.html");
            }else{
                check[1].innerText = 'Please Confirm Password';
            }
        });