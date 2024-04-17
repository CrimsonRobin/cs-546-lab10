//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
const exportedMethods = {
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

export default exportedMethods;