function register(formElement) {
    const username = formElement.username.value;
    const password = formElement.password.value;
    const user = {username, password};
    
    try{
        LoggerService.log("log", `registration::register -> creating user: ${JSON.stringify(user)}`);
        _setFormState("disable");
        UserService.createUser(user)
            .then((data) => {
                _setFormState("enable")
                LoggerService.log("log", `registration::register -> Create user was successful: ${JSON.stringify(data)}`);
                
            })
            .catch((error) => {
                _setFormState("enable")
                LoggerService.log("log", `registration::register -> Creating user failed: ${JSON.stringify(user)} with: `);
                LoggerService.log("error", error);
                
                let usernameErrorElement = document.getElementById('username-error');
                if( ((((error || {}).target || {}).error || {}).name || '') ===  'ConstraintError') {
                    usernameErrorElement.style.display = 'block';
                } else {
                    usernameErrorElement.style.display = 'none';
                }
            });
    } catch(error) {
        LoggerService.log("log", `registration::register -> Catch -> Creating user failed: ${JSON.stringify(user)} with: `);
        LoggerService.log("error", error);
    }
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


function _setFormState(state) {
    const form = document.getElementById('registration-form');
    for(let elementIndex = 0; elementIndex < form.elements.length; elementIndex++) {
        form.elements[elementIndex].disabled = state === 'disable';
    };

    const submitButton = document.getElementById('registration-button');
    submitButton.disabled = state === 'disable';
}