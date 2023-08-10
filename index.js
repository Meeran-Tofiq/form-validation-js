const form = document.querySelector('form');
const fname = form.querySelector('#fname');
const lname = form.querySelector('#lname');
const email = form.querySelector('#email');
const password = form.querySelector('#password');
const passwordConf = form.querySelector('#confirm-password');
const country = form.querySelector('#country');
const zip = form.querySelector('#zip-code');
const submit = form.querySelector('button[type="submit"]');

const fnameError = form.querySelector("#fname + span.error");
const lnameError = form.querySelector("#lname + span.error");
const emailError = form.querySelector("#email + span.error");
const passwordError = form.querySelector("#password + span.error");
const passwordConfError = form.querySelector("#confirm-password + span.error");
const countryError = form.querySelector("#country + span.error");
const zipError = form.querySelector("#zip-code + span.error");
const submitError = form.querySelector('button[type="reset"] + span.error');

const passwordStrengthRegEx = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/;
const inputArray = [
    fname,
    lname,
    email,
    password,
    passwordConf,
    country,
    zip
]

fname.addEventListener("input", function(event) {
    if (this.validity.valid) {
        fnameError.textContent = "";
        fnameError.className = "error";
    } else {
        showError(this, fnameError, "first name");
    }
});

lname.addEventListener("input", function(event) {
    if (this.validity.valid) {
        lnameError.textContent = "";
        lnameError.className = "error";
    } else {
        showError(this, lnameError, "last name");
    }
});

email.addEventListener("input", function(event) {
    console.log(this.validity.valid)
    if (this.validity.valid) {
        emailError.textContent = "";
        emailError.className = "error";
        console.log(this)
    } else {
        showError(this, emailError, "email");
    }
});

password.addEventListener("input", function(event) {
    if (!passwordStrengthRegEx.test(this.value)) {
        showPasswordError(this, passwordError, "password");
    } else {
        passwordError.textContent = "";
        passwordError.className = "error";
    }
});

passwordConf.addEventListener("input", function(event) {
    if (this.value === password.value) {
        passwordConfError.textContent = "";
        passwordConfError.className = "error";
    } else {
        showPasswordConfirmError(passwordConfError);
    }
});

country.addEventListener("input", function(event) {
    if (this.validity.valid) {
        countryError.textContent = "";
        countryError.className = "error";
    } else {
        showError(this, countryError, "country");
    }
});

zip.addEventListener("input", function(event) {
    if (this.validity.valid) {
        zipError.textContent = "";
        zipError.className = "error";
    } else {
        showError(this, zipError, "zip code");
    }
});

form.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log(submit)

    submitError.textContent = '';
    submitError.className = "error";

    inputArray.forEach(el => {
        if(!el.validity.valid || el.value === undefined) {
            submitError.textContent = "You must enter valid data in" +
            "all required boxes to proceed.";
            submitError.className = "error active";
        }
    });
})

function showError(el, errorEl, msgAddon) {
    if(el.validity.valueMissing) {
        errorEl.textContent = `You must enter a ${msgAddon} to proceed.`;
    } else if (el.validity.typeMismatch) {
        errorEl.textContent = `Your inputted ${msgAddon} has to be valid to proceed.`
    } else if (el.validity.tooShort || el.validity.tooLong) {
        console.log(el.type)
        errorEl.textContent = `The ${msgAddon} had to be between ${el.minLength} 
        and ${el.maxLength === -1 ? "infinity" : el.maxLength}`;
    }
    
    errorEl.className = "error active";
}

function showPasswordError(el, elError, msgAddon) {
    elError.textContent = `Your ${msgAddon} has to be:
    \t8 characters long
    \t2 letters uppercase
    \t1 special character
    \t2 numbers
    \t3 letters lowercase`;
    
    elError.className = "error active";
}

function showPasswordConfirmError(elError) {
    elError.textContent = "Your input doesn't match your previous password submission."
    elError.className = "error active";
}