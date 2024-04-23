/* In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages.
The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will 
intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing
fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them 
of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. 
If the form being submitted has all valid data, then you will allow it to submit to the server for processing. 
Don't forget to check that password and confirm password match on the registration form!
*/

(function () {
    const validationMethods = {
        checkString(name, str, noNum, min, max) {
            if(!str) {
                errors.push(`${name} is undefined.`);
            }
            if(typeof str !== "string") {
                errors.push(`${name} is not a string.`);
            }
            str = str.trim();
            if(str.length === 0) {
                errors.push(`${name} is empty.`);
            }
    
            if(noNum) {
                if(str.match(/\d/) !== null) {
                    errors.push(`${name} contains numbers.`);
                }
            }
    
            if(min) {
                if(str.length <= min) {
                    errors.push(`${name} is less than ${min} characters long.`);
                }
            }
            if(max) {
                if(str.length >= max) {
                    errors.push(`${name} is greater than ${max} characters long.`);
                }
            }
    
            return str;
        },
        checkPassword(password) {
            //will be called after checkString
            if(!password) {
                errors.push(`Password is not provided.`);
            }
    
            if(password.match(/[A-Z]/) === null) {
                errors.push(`Password needs at least one uppercase character.`);
            }
            if(password.match(/\d/) === null) {
                errors.push(`Password needs at least one number.`);
            }
            if(password.match(/[#?!@$ %^&*-]/) === null) {
                errors.push(`Password needs at least one special character.`);
            }
        },
        validValues(name, str, v1, v2) {
            //checks if given string is one of the two values
            if(str !== v1 && str !== v2) {
                errors.push(`Did not supply a valid value for ${name}`);
            }
    
            return str;
        }
    };

    const signInForm = document.getElementById("signin-form");
    const signUpForm = document.getElementById("signup-form");
    let errorDiv = document.getElementById("error-div");
    let errors = [];

    if(signInForm) {
        signInForm.addEventListener("submit", (event) => {
            errors = [];
            errorDiv.hidden = true;
            let username = document.getElementById("username");
            let password = document.getElementById("password");

            username.value = validationMethods.checkString("Username", username.value.toLowerCase(), true, 5, 10);
            password.value = validationMethods.checkString("Password", password.value, false, 8);
            validationMethods.checkPassword(password.value);

            if(errors.length > 0) {
                errorDiv.hidden = false;
                let errorList = document.createElement('ul');

                event.preventDefault();
                for (let i = 0; i < errors.length; i++) {
                    let errorItem = document.createElement('li');
                    errorItem.innerHTML = errors[i];
                    errorList.appendChild(errorItem);
                }
                signInForm.appendChild(errorList);
            }
        });
    };

    if(signUpForm) {
        signUpForm.addEventListener("submit", (event) => {
            errors = [];
            errorDiv.hidden = true;
            let firstName = document.getElementById("firstName");
            let lastName = document.getElementById("lastName");
            let username = document.getElementById("username");
            let password = document.getElementById("password");
            let confirmPassword = document.getElementById("confirmPassword");
            let favoriteQuote = document.getElementById("favoriteQuote");
            let themePreference = document.getElementById("themePreference");
            let role = document.getElementById("role");

            firstName.value = validationMethods.checkString("First Name", firstName.value, true, 2, 25);
            lastName.value = validationMethods.checkString("Last Name", lastName.value, true, 2, 25);
            username.value = validationMethods.checkString("Username", username.value.toLowerCase(), true, 5, 10);
            password.value = validationMethods.checkString("Password", password.value, false, 8);
            validationMethods.checkPassword(password.value);
            confirmPassword.value = validationMethods.checkString("confirmPassword", confirmPassword.value, false, 8);
            validationMethods.checkPassword(confirmPassword.value);
            favoriteQuote.value = validationMethods.checkString("Favorite Quote", favoriteQuote.value, false, 20, 255);
            themePreference.value = validationMethods.validValues("Theme Preference", themePreference.value.toLowerCase(), "light", "dark");
            role.value = validationMethods.validValues("Role", role.value.toLowerCase(), "admin", "user");

            if(errors.length > 0) {
                let errorList = document.createElement('ul');

                event.preventDefault();
                for (let i = 0; i < errors.length; i++) {
                    let errorItem = document.createElement('li');
                    errorItem.innerHTML = errors[i];
                    errorList.appendChild(errorItem);
                }
                signUpForm.appendChild(errorList);
            }
        });
    };
})();