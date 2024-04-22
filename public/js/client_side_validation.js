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
                throw new Error(`${name} is undefined.`);
            }
            if(typeof str !== "string") {
                throw new Error(`${name} is not a string.`);
            }
            str = str.trim();
            if(str.length === 0) {
                throw new Error(`${name} is empty.`);
            }
    
            if(noNum) {
                if(str.match(/\d/) !== null) {
                    throw new Error(`${name} contains numbers.`);
                }
            }
    
            if(min) {
                if(str.length <= min) {
                    throw new Error(`${name} is less than ${min} characters long.`);
                }
            }
            if(max) {
                if(str.length >= max) {
                    throw new Error(`${name} is greater than ${max} characters long.`);
                }
            }
    
            return str;
        },
        checkPassword(password) {
            //will be called after checkString
            if(!password) {
                throw new Error(`Password is not provided.`);
            }
    
            if(password.match(/[A-Z]/) === null) {
                throw new Error(`Password needs at least one uppercase character.`);
            }
            if(password.match(/\d/) === null) {
                throw new Error(`Password needs at least one number.`);
            }
            if(password.match(/[#?!@$ %^&*-]/) === null) {
                throw new Error(`Password needs at least one special character.`);
            }
        },
        validValues(name, str, v1, v2) {
            //checks if given string is one of the two values
            if(str !== v1 && str !== v2) {
                throw new Error(`Did not supply a valid value for ${name}`);
            }
    
            return str;
        }
    };

    let signInForm = document.getElementById("signin-form");
    let signUpForm = document.getElementById("signup-form");

    if(signInForm) {
        signInForm.addEventListener("submit", (event) => {
            
            let username = document.getElementById("username");
            let password = document.getElementById("password");

            try {
                username.value = validationMethods.checkString("Username", username.value.toLowerCase(), true, 5, 10);
                password.value = validationMethods.checkString("Password", password.value, false, 8);
                validationMethods.checkPassword(password.value);
            } catch (error) {
                event.preventDefault();
                //show error
            }
        });
    };

    if(signUpForm) {
        signUpForm.addEventListener("submit", (event) => {
            
            let firstName = document.getElementById("firstName");
            let lastName = document.getElementById("lastName");
            let username = document.getElementById("username");
            let password = document.getElementById("password");
            let confirmPassword = document.getElementById("confirmPassword");
            let favoriteQuote = document.getElementById("favoriteQuote");
            let themePreference = document.getElementById("themePreference");
            let role = document.getElementById("role");

            try {
                firstName.value = validationMethods.checkString("First Name", firstName.value, true, 2, 25);
                lastName.value = validationMethods.checkString("Last Name", lastName.value, true, 2, 25);
                username.value = validationMethods.checkString("Username", username.value.toLowerCase(), true, 5, 10);
                password.value = validationMethods.checkString("Password", password.value, false, 8);
                validationMethods.checkPassword(password.value);
                confirmPassword.value = validationMethods.checkString("confirmPassword", confirmPassword.value, false, 8);
                validationMethods.checkPassword(confirmPassword.value);
                favoriteQuote.value = validationMethods.checkString("Favorite Quote", favoriteQuote.value, true, 20, 255);
                themePreference.value = validationMethods.validValues("Theme Preference", themePreference.value.toLowerCase(), "light", "dark");
                role.value = validationMethods.validValues("Role", role.value.toLowerCase(), "admin", "user");
            } catch (error) {
                event.preventDefault();
                //show error
            }
        });
    };
})();