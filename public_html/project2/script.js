/**
 * testLength - Makes sure that the value parameter matches the length parameter
 */ 
function testLength(value, length) {
    if (value.length === length) {
        return true;
    }
    return false;
}

/**
 *  testNumber - makes sure that the value parameter is an actual number  
 */
function testNumber(value) {
    if (isNaN(value)) {
        return false;
    }
    return true;
}

/**
 * validateControl - makes sure that the control parameter is the correct length and is a number
 *                   used to make sure that the Zip and CVC are valid
 */ 
function validateControl(control, name, length) {
    resultLength = testLength(control, length);
    resultNumber = testNumber(control);

    if (resultLength === true) {
        if (resultNumber === true) {
            if (resultLength === true && resultNumber === true) {
                document.getElementById(name).innerHTML = " ";
                return true;
            } else {
                return false;
            }
        } 
        document.getElementById(name).innerHTML = "*" + name + " is an invalid input";
        return false;
    }
    document.getElementById(name).innerHTML = "*" + name + " should be " + length + " long";
    return false;
}

/**
 * validateCreditCard - makes sure that the value parameter is a number, has a valid length and starting number
 */
function validateCreditCard(value) {
    cardNumber = value;
    cardResult = cardNumber.split(" ").join("");

    cardNumberResult = testNumber(cardResult);

    if (cardNumberResult === true) {
        if (cardResult.charAt(0) === "3" || cardResult.charAt(0) === "6" || cardResult.charAt(0) === "5" || 
                cardResult.charAt(0) === "4") {
            if (testLength(cardResult, 15) === true || testLength(cardResult, 16) === true) {
                document.getElementById("cardnumberError").innerHTML = " ";
                return true;
            }
            document.getElementById("cardnumberError").innerHTML = "*Card number not right length";
            return false;
        }
        document.getElementById("cardnumberError").innerHTML = "*Card number doesn't start with correct number";
        return false;
    }
    document.getElementById("cardnumberError").innerHTML = "*Invalid input. Credit card cannot be used";
    return false;
}

/**
 * validateDate - makes sure that value parameter is larger than today's current date
 */
function validateDate(value) {
    inputDate = new Date(value);
    todaysDate = new Date();
    thisMonth = todaysDate.getMonth();
    thisYear = todaysDate.getFullYear();

    if (inputDate <= todaysDate || (inputDate.getMonth() === thisMonth && inputDate.getFullYear() === thisYear)) {
        document.getElementById("dateError").innerHTML = "*Wrong expiration date";
        return false;
    }
    document.getElementById("dateError").innerHTML = " ";
    return true;
    
}

/**
 * validateEmail - makes sure that value parameter meets email requirements according to the regular expresssion
 * 
 * note: regex provided from w3schools
 * https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_email_pattern
 */
function validateEmail(value) {
    emailRegEx = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/; 
    if (emailRegEx.test(value) !== true) {
        document.getElementById("emailError").innerHTML = "*Please enter a valid email address";
        return false;
    }
    document.getElementById("emailError").innerHTML = " ";
    return true;
}

/**
 * validateState - makes sure that value parameter has a state selected in the form
 */
function validateState(value) {
    if (value !== 0) {
        document.getElementById("statesError").innerHTML = " ";
        return true;
    }
    document.getElementById("statesError").innerHTML = "*Please select a state";
    return false;
}

/**
 * validateForm - only function that interacts with form; calls all other functions above to apply to form
 */
function validateForm() {
    validateEmail(document.getElementById("emailAddress").value);
    validateState(document.getElementById("states").selectedIndex);
    validateControl(document.getElementById("zip").value, "Zip", 5);
    validateCreditCard(document.getElementById("cardnumber").value);
    validateDate(document.getElementById("expirationdate").value);
    validateControl(document.getElementById("cvc").value, "Security Code", 3);
 
    if (validateEmail(document.getElementById("emailAddress").value) === true &&
        validateState(document.getElementById("states").selectedIndex) === true &&
        validateControl(document.getElementById("zip").value, "Zip", 5) === true &&
        validateCreditCard(document.getElementById("cardnumber").value) === true &&
        validateDate(document.getElementById("expirationdate").value) === true &&
        validateControl(document.getElementById("cvc").value, "Security Code", 3) === true) {
            alert("Payment Successfully Submitted");
            document.getElementsByTagName(form).reset();        
        }
    return false;
}
