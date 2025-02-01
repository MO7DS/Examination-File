//Intialization for Hmtl Elements

//Authentication Input  Catch
const firstName = document.getElementsByClassName("fName")[0];
const lastName = document.getElementsByClassName("lName")[0];
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPasssword = document.getElementById("confirmPassword");
const submit = document.getElementsByClassName("submit")[0];

const body = document.getElementsByTagName("body")[0];
const form = document.querySelector("form");
// const inputDiv = document.querySelectorAll(".input")
//Error Message Catch
const firstNameError = document.getElementsByClassName("firstNameError")[0];
const lastNameError = document.getElementsByClassName("lastNameError")[0];
const emailError = document.getElementsByClassName("emailError")[0];
const passwordError = document.getElementsByClassName("passwordError")[0];
const confirmPasswordError = document.getElementsByClassName("confirmPasswordError")[0];
// Variables

// Error Visibility
let firstNameErrorVisible = false ;
let lastNameErrorVisible = false ;
let emailErrorVisible = false ;
let passwordErrorVisible = false ;
let confirmPasswordErrorVisible  = false ;

//Data Filled
let nameFilled = [false , false] ;
let emailFilled = false;
let passwordFilled = false;
let confirmPassswordFilled = false;



//Functions

//Authentication Validation Functions

//User First Name Validation for first Name

function nameValidation( inputElement , errorElement , nameType , index){
    
    // Intialization the input Element and remove the space

    const input = inputElement.value.trim();
    
    // Checking if the name is empty

    if(input === ""){
    //     errorElement.style.display = "block";
    //     errorElement.innerHTML = `${nameType} shouldn't include a empty`;
        nameFilled[index] = false
        firstNameErrorVisible = true;
        return false
    }

        // Check if the input includes any spaces

    if (/\s/.test(input)){
        errorElement.style.display = "block";
        errorElement.innerHTML =`${nameType} must not contain spaces` ;
        nameFilled[index] = true;
        firstNameErrorVisible = true;
        return false
    }

    // Checking if the name input include any numbers

    if( Array.from(input).some(char => !isNaN(char))){
        errorElement.style.display = "block";
        errorElement.innerHTML =`${nameType} must not contain a numbers` ;
        nameFilled[index] = true;
        firstNameErrorVisible = true;
        return false
    }
    
    //  Checking if the name length is more than 16 char

    if(input.length >= 16){
        errorElement.style.display = "block";
        errorElement.innerHTML = `${nameType} maximum length is 16 character`;
        nameFilled[index] = true;
        firstNameErrorVisible = true;
        return false
    }

    //Clear error message

    errorElement.style.display = "none";
    nameFilled[index] = true;
    firstNameErrorVisible = false;
    return true

}
//"JohnDoe"	Pass ✅
// "John Doe"	Fail ❌ (Contains a space)
// " John"	Fail ❌ (Leading space)
// "Doe "	Fail ❌ (Trailing space)
// "John123"	Fail ❌ (Contains numbers)

// while user input first name data the validation work

//User Email Validation

function emailValidation(inputElement , errorElement ){
    
    // intialization for  remove spaces
    let inputemail = inputElement.value.trim();

    // intialization for  remove spaces


    // check if the mail include is empty
    if(inputemail === ""){

        emailFilled = false;
        emailErrorVisible = true;
        return false
    }
    
    //check if the mail include @

    if(!inputemail.includes(`@`)){
        errorElement.style.display = "block";
        errorElement.innerHTML = `email must include '@'`;
        emailErrorVisible = true;
        return false;
    }

    //seperate the mail to two parts `mohamed @ mail.com`
    let parts = inputemail.split(`@`);

    // check if the mail has local part [0]

    if(parts[0].length === 0){
        errorElement.style.display = "block";
        errorElement.innerHTML = `email must include a local part before '@'`;
        emailErrorVisible = true;
        return false
    }

    // check if the mail has domain
    
    if(parts.length < 2  || parts[1].length === 0){
        errorElement.style.display = "block";
        errorElement.innerHTML = `email must include a domain part after '@' (e.g., '@domain.com')`;
        emailErrorVisible = true;
        return false
    }
    
    if(!parts[1].includes(`.`)){
        errorElement.style.display = "block";
        errorElement.innerHTML = `email must include '.'`;
        emailErrorVisible = true;
        return false;
    }
    let domainParts = parts[1].split('.');

    // check if the mail has domain

    if(domainParts < 2 || domainParts[0].length === 0){
        errorElement.style.display = "block";
        errorElement.innerHTML = `email must include a domain name and suffix (e.g., 'domain.com')`;
        emailErrorVisible = true;
        return false;
    }
    
    // check if the domain suffix include only (com / org);
    
    if( domainParts[1].length === 0 ){
        errorElement.style.display = "block";
        errorElement.innerHTML = `email domain suffix is invalid (e.g.,'com')`;
        emailErrorVisible = true;
        return false;
    }
    errorElement.style.display = "none";
    emailFilled = true;
    emailErrorVisible = false;
    return true;

}

// Examples
// Input	Error Message	Valid?
// user@domain.com	No error	✅
// user@domain.org	No error	✅
// user@domain.net	Email domain suffix is invalid ('.com' or '.org' only)	❌
// user@domain	Email must include a valid domain name and suffix (e.g., "domain.com")	❌
// userdomain.com	Email must contain '@'	❌
// user@.com	Email must include a valid domain name and suffix (e.g., "domain.com")	❌


//User Password Validation
function passwordValidation(inputElement, errorElement){
    
    // 
    let inputPass = inputElement.value.trim();

    // devid the password regular expression 
    //uppercase
    const passRegexCap= /^(?=.*[A-Z]).{1,}$/;
    //loweercase
    const passRegexSmall= /^(?=.*[a-z]).{1,}$/;
    //@
    //Checking if the password doesn't empty

    if(inputPass === ""){
 
        passwordFilled = false;
        passwordErrorVisible = true;
        return false;
    }
    
    //Checking if the password contain at least lowercase letter

    if(!passRegexSmall.test(inputPass)){
        errorElement.style.display = "block";
        errorElement.innerHTML = `password must contain  lowercase letter.`  
        passwordErrorVisible = true;  
        return false;
    }

    //Checking if the password contain at least uppercase letter
    if(!passRegexCap.test(inputPass) ){
        errorElement.style.display = "block";
        errorElement.innerHTML = `password must contain at least one uppercase letter.` ;
        passwordErrorVisible = true;
        return false;
    }

    // Checking the length of the password to be more than  or equal 6 chars
    if(inputPass.length < 6){
        errorElement.style.display = "block";
        errorElement.innerHTML = `password must be at least 6  characters long.`;
        passwordErrorVisible = true; 
        return false;
    }
    
    errorElement.style.display = "none";
    passwordFilled = true;
    passwordErrorVisible = false;
    return true;
}

//User Confirming Password Validation
function confirmPasswordValidation(inputElement , errorElement , originalPassword){
    
    const inputPass = inputElement.value.trim();
    
    //Checking the confirm password is not empty
    if(inputPass === ""){

        confirmPassswordFilled = false ;
        confirmPasswordErrorVisible = true;
        return false;
    }
    
    // comparing the confirm password with the orignial password

    if(inputPass !== originalPassword){
        errorElement.style.display = "block";
        errorElement.innerHTML = `passwords does't match`;
        confirmPasswordErrorVisible = true;
        return false;
    }

    errorElement.style.display = "none";
    confirmPassswordFilled = true;
    confirmPasswordErrorVisible = false;
    return true;
}


function checkValidation(event){
    event.preventDefault();
    let isValid = true;
    
    if(!nameFilled[0]){
        firstNameError.style.display = "block";
        firstNameError.innerHTML = "This Field is Required";
        event.preventDefault();
        isValid = false;
        return false;
    }

    if(!isValid){
        return false;
    }

    if(!nameFilled[1]){
        lastNameError.style.display = "block";
        lastNameError.innerHTML = "This Field is Required";
        event.preventDefault();
        isValid = false;
        return false;
    }

    if(!isValid){
        return false;
    }

    if(!emailFilled){
        emailError.style.display = "block";
        emailError.innerHTML = "This Field is Required";
        event.preventDefault();
        isValid = false;
        return false;
    }

    if(!isValid){
        return false;
    }
    
    if(!passwordFilled){
        passwordError.style.display = "block";
        passwordError.innerHTML = "This Field is Required";
        event.preventDefault();
        isValid = false;
        return false;
    }

    if(!isValid){
        return false;
    }

    
    if(!confirmPassswordFilled){
        confirmPasswordError.style.display = "block";
        confirmPasswordError.innerHTML = "This Field is Required";
        event.preventDefault();
        isValid = false;
        return false;
    }


    localStorage.setItem("userFirstName", firstName.value.trim());
    localStorage.setItem("userLastName", lastName.value.trim());
    localStorage.setItem("userEmail", email.value.toLowerCase().trim());
    localStorage.setItem("userPassword", password.value.trim());

    window.location.replace(`../log-in/log-in.html`);
}





firstName.addEventListener("input",() => {firstNameError.style.display = "none"});
// after the user blur the data 
firstName.addEventListener("blur",(event) => {
    firstNameErrorVisible = nameValidation(event.target ,firstNameError , `first name` , 0 );
});


// while user input last name data the validation work
lastName.addEventListener("input",() => {lastNameError.style.display = "none"});
// after the user blur the data 
lastName.addEventListener("blur",(event) => {
    lastNameErrorVisible = nameValidation(event.target , lastNameError , `last name` , 1);
});

email.addEventListener("input" , () => {emailError.style.display = "none"});
email.addEventListener("blur" , (event) => {
    emailErrorVisible = emailValidation(event.target , emailError );
    
})

password.addEventListener("input" ,() => {passwordError.style.display = "none";});
password.addEventListener("blur" , (event) =>{
    // this for cheking the confirm password if the password changed after the first time
    passwordErrorVisible = passwordValidation(event.target , passwordError);
    if(confirmPassswordFilled){
        confirmPasswordErrorVisible = confirmPasswordValidation(confirmPasssword , confirmPasswordError , password.value)    
    }
})

confirmPasssword.addEventListener('input' , () => {confirmPasswordError.style.display = "none"});
confirmPasssword.addEventListener('blur' , (event) => {
    confirmPasswordErrorVisible = confirmPasswordValidation(event.target , confirmPasswordError , password.value)    
})

submit.addEventListener('click', checkValidation);


form.addEventListener('click', function clearError(event){  

    //This function role is to clear any error message 

    if(event.target.tagName === "INPUT"){

        //Catch the input box 
        const currentElement = event.target;
        const parent = currentElement.parentElement;
        const error = parent.querySelector(".authenticationError");
        if(error){
            error.style.display = "none";
        }
    }

})