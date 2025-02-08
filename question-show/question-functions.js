function displayQuestion(arrayQuestions, index) {
    // Update the question and answer options
    checkNextPrevStatu(index);
    question.innerHTML = `<p>${arrayQuestions[index].question}</p>`;
    answers.innerHTML = ""; // Clear previous answers
    let answerIndex = 0 ;
    
    checkFlag(index) 
    arrayQuestions[index].answers.forEach(answersElement => {
        if (arrayQuestions[index].type === "single-choice") {
            answers.innerHTML += `<label class = "answersInput"><input type="radio" name = "examAnswers" id = "answer${answerIndex}" value = "${answerIndex}" onclick = "saveSingleAnswers(${index} , ${answerIndex})"> <span for = "answer${answerIndex}">${answersElement}</span> </label>`;
        } else if (arrayQuestions[index].type === "multi-choice") {
            answers.innerHTML += `<label class = "answersInput"><input type = "checkbox" name = "examAnswers" id = "answer${answerIndex}"value ="${answerIndex}" onclick = "collectAnswers(${index} , ${answerIndex})"  > <span for = "answer${answerIndex}">${answersElement}</span> </label>`;
        }
        answerIndex++;
        
    });

    showAnswers(index);
    currentQuestionNumber.innerHTML = `${index+1}`;
    totalQuestionNumber.innerHTML = `${arrayQuestions.length}`;

}

function checkNextPrevStatu(index){
    if(index == 0){
        previousBut.style.opacity = ".5";
        previousBut.style.backgroundImage = `url(../svg/buttonDefault.svg)`;
        previousBut.style.color = `#7B7B7B`;
        previousBut.style.cursor = `not-allowed`;

        nextBut.style.opacity = "1"
        nextBut.style.backgroundImage = `url(../svg/buttonDefault.svg)`;
        nextBut.style.color = `#2D1401`;
        nextBut.style.cursor = `pointer`;

    }else if(index == questionsContainer.length-1){
        nextBut.style.opacity = ".5";
        nextBut.style.backgroundImage = `url(../svg/buttonDefault.svg)`;
        nextBut.style.color = `#7B7B7B`;
        nextBut.style.cursor = `not-allowed`;

        previousBut.style.opacity = "1"
        previousBut.style.backgroundImage = `url(../svg/buttonDefault.svg)`;
        previousBut.style.color = `#2D1401`;
        previousBut.style.cursor = `pointer`;

    }else{
        previousBut.style.opacity = "1"
        previousBut.style.backgroundImage = `url(../svg/buttonDefault.svg)`;
        previousBut.style.color = `#2D1401`;
        previousBut.style.cursor = `pointer`;
        
        nextBut.style.opacity = "1"
        nextBut.style.backgroundImage = `url(../svg/buttonDefault.svg)`;
        nextBut.style.color = `#2D1401`;
        nextBut.style.cursor = `pointer`
    }
}
// Function to display the current question and its answers

// Collect Answer save the user check box Answer in an array 


function collectAnswers(index) {
    let selectedAnswers = []; 

    const checkboxes = document.querySelectorAll("input[name='examAnswers']:checked");

    checkboxes.forEach(checkbox => {
        selectedAnswers.push(checkbox.value.trim()); 
    });

    saveMultipleAnswers(index, selectedAnswers);
}



function saveMultipleAnswers(index, selectedAnswers) {

    if (!userAnswers[index]) {
        userAnswers[index] = [];
    }
    // Checking if there is any change in the slecetedAnswers value
    if(selectedAnswers.length === userAnswers.length && selectedAnswers.forEach(val => userAnswers[index] === val)){
        return;
    }

    // filter the deleted answer in the selectedAnswers with the answers in the userAnswer array  and create a new array of userANser
    userAnswers[index] = userAnswers[index].filter(answer => selectedAnswers.includes(answer));

    // Adding the new answers in selectAnswers that is not saved  in userAnser[index]
    selectedAnswers.forEach(answer => {
        if (!userAnswers[index].includes(answer)) {
            userAnswers[index].push(answer); 
            // Map creating a new array with number instaede of string
            userAnswers[index] = userAnswers[index].map(answer => Number(answer));
        }

    });
}

function saveSingleAnswers( index , answerIndex){
    userAnswers[index] = answerIndex+1 ;
}

function showAnswers(index) {
    // Get all the inputs (checkboxes/radio buttons) with the name 'examAnswers'
    const inputCheckBox = document.querySelectorAll("input[type='checkbox']");
    const inputRadio = document.querySelectorAll("input[type='radio']");

    // Check if there are answers saved for the given index
    if (userAnswers[index]) {
        // Loop through each saved answer
        if(typeof userAnswers[index] == "object"){
            userAnswers[index].forEach(answer => {
                // Loop through each input to check if its value matches any saved answer
                inputCheckBox.forEach(input => {
                    if (Number(input.value) === answer) {
                        input.checked = true; // Sets the checkbox or radio button as checked
                    }
                });
            })
        }else{

            inputRadio.forEach(input => {

                if (Number(input.value) === (userAnswers[index]-1)) {

                    input.checked = true; // Sets the checkbox or radio button as checked
                }
            });
        }

    } 
}


// Functions for navigating between questions
function nextButton(questionsContainer) {
    if (index < questionsContainer.length - 1) {
        index++;
        checkFlag(index)
        displayQuestion(questionsContainer, index);
    }
}

function prevButton(questionsContainer) {
    if (index > 0) {
        index--;
        checkFlag(index)
        displayQuestion(questionsContainer, index);
        
    }
}



// Function to create a shuffled list of questions from all difficulty levels
function createAnInstant(data) {

    let exam = new Exam(data);

    // Fetch questions for each difficulty level
    exam.setDifficulty("easy");
    let easyQuestions = exam.getQuestions();

    exam.setDifficulty("medium");
    let mediumQuestions = exam.getQuestions();

    exam.setDifficulty("hard");
    let hardQuestions = exam.getQuestions();
    // Shuffle and merge questions from different difficulty levels
    let questionArray = shuffle(easyQuestions);
    questionArray.push(...shuffle(mediumQuestions));
    questionArray.push(...shuffle(hardQuestions));
    return questionArray;

}

// Function to shuffle the questions
function shuffle(questionArray) {
    let shuffleQuestion = [];
    let usedIndices = new Set();

    // Select random questions
    while (shuffleQuestion.length < 4) {
        let randomIndex = Math.floor(Math.random() * questionArray.size);

        if (!usedIndices.has(randomIndex)) {
            shuffleQuestion.push(questionArray.question[randomIndex]);
            usedIndices.add(randomIndex);
        }
    }
    return shuffleQuestion;
}


function correctAnswars(event , questionsContainer){

    const fullScore = 100;
    let userScore = 0;
    let questionScore = Math.floor(fullScore / questionsContainer.length); 

    let index = 0 ;
    let wrongAnswers = [];
    event.preventDefault()
    userAnswers.forEach( (answers) =>{

        const currentQuestion = questionsContainer[index];
        const rightAnswer = questionsContainer[index].rightAnswer;
        const questionTest = questionsContainer[index].question;

        if(Array.isArray(answers) ){
            const isCorrect = answers.length === rightAnswer.length && answers.every(answer => rightAnswer.includes(answer));
            if(isCorrect){
                userScore += questionScore;
            }else{                   
                //for saving wrong questions
                wrongAnswers.push(questionTest)
            }
        }
        else{
            if((answers-1) === rightAnswer){
                userScore += questionScore;
            }else{
                wrongAnswers.push(questionTest)
            }
        }
        index++;
    })
    // sessionStorage.setItem("wrongAnswers",wrongAnswers);
    sessionStorage.setItem("score",userScore)
    
    if( userScore >  fullScore / 2){
        window.location.replace(`../success/success.html`)
    }else{
        window.location.replace(`../fail/fail.html`)
    }

}


