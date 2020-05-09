function register(formElement) {
    const username = formElement.username.value;
    const password = formElement.password.value;
}

function toggleShowPassword(checkbox) {
    let passwordInput = document.getElementById("password");
    if(checkbox.checked) {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}


function passwordValidations() {
    const password = document.getElementById('password').value;
    const passwordTwo = document.getElementById('passwordTwo').value;
    let matchErrorElement = document.getElementById('password-match-error'); 

    if(password && passwordTwo && password !== passwordTwo) {
        matchErrorElement.style.display = 'block';
    } else if(password && passwordTwo && password === passwordTwo){
        matchErrorElement.style.display = 'none';
    }
}