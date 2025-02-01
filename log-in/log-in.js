const email = document.getElementById("email");
const password = document.getElementById("password");

const body = document.getElementsByTagName("body")[0];
const form = document.querySelector("form");
const inputDiv = document.querySelectorAll(".input")

const login = document.getElementsByClassName('submit')[0]
const emailError = document.getElementsByClassName("emailError")[0];
const passwordError = document.getElementsByClassName("passwordError")[0];
const userError = document.getElementsByClassName("userValidation")[0];

let emailErrorVisible = false ;
let passwordErrorVisible = false ;

let emailFilled = false;
let passwordFilled = false;


function emailValidation(inputElement , errorElement ){

    
    // intialization for  remove spaces
    let inputemail = inputElement.value.trim();

    // intialization for  remove spaces


    // check if the mail include is empty
    if(inputemail === ""){
    //     errorElement.style.display = "block";
    //     errorElement.innerHTML = "Email Shouldn't be empty";
        emailFilled = false;
        emailErrorVisible = false;
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
        errorElement.innerHTML = `email must include a domain part after '@'`
        emailErrorVisible = true;
        return false
    }

    if(!inputemail.includes(`.`)){
        errorElement.style.display = "block";
        errorElement.innerHTML = `email must include a'.'`
        emailErrorVisible = true;
        return false
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

    if( domainParts[1].length < 3 || domainParts[1].length === 0  ){
        errorElement.style.display = "block";
        errorElement.innerHTML = `email domain suffix is invalid ('.com' \ '.org')`;
        emailErrorVisible = true;
        return false;
    }
    errorElement.style.display = "none";
    emailErrorVisible = false;
    emailFilled = true;
    return true;

}

function passwordValidation(inputElement, errorElement){
    
    // 
    let inputPass = inputElement.value.trim();

    if(inputPass === ""){
        passwordFilled = false;
        passwordErrorVisible = true;
        return false;
    }    
    errorElement.style.display = "none";
    passwordErrorVisible = false;
    passwordFilled = true;
    return true;
}

function checkVlidation(event){

    event.preventDefault();
    // hide all errors while submit
    

    // prevent from submit
    
    let isValid = true;

    //show input input required to fill;

 
    if(!emailErrorVisible){
        isValid = false;
        return false;
    }else if(!emailFilled){
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

    if(isValid){
        userError.style.display = "none"
        let dataCheck = checkEmailInLocalStorage(email.value.toLowerCase().trim() , password.value);
        if(dataCheck){
            window.location.replace(`../html_pages/choose.html`);
            return true;
        }
        userError.style.display = "block"
        userError.innerText = "Your email or password is incorrect.";
        event.preventDefault();
        return false;

    }
    
}

function checkEmailInLocalStorage(emailValue , passwordValue){
    if(emailValue === localStorage.getItem("userEmail") && passwordValue === localStorage.getItem("userPassword")){
        return true ;
    }else{
        return false;
        //show Error
    }
}

email.addEventListener("focus",() => {userError.style.display = "none";})
email.addEventListener("focus" , () => {emailError.style.display = "none"});
email.addEventListener("blur" , (event) => {
    emailErrorVisible = emailValidation(event.target , emailError );
    
})


password.addEventListener("focus",() => {userError.style.display = "none";})
password.addEventListener("focus" ,() => {passwordError.style.display = "none";});
password.addEventListener("blur" , (event) =>{
    // this for cheking the confirm password if the password changed after the first time
    passwordErrorVisible = passwordValidation(event.target , passwordError);
})

login.addEventListener('click', checkVlidation);

// form.addEventListener('click', function clearError(event){  

//     //This function role is to clear any error message 

//     if(event.target.tagName == "INPUT"){

//         //Catch the input box 
//         const currentElement = event.target;
//         const parent = currentElement.parentElement;
//         const error = parent.querySelector(".authenticationError");
//         if(error){
//             error.style.display = "none";
//         }
//     }

// })