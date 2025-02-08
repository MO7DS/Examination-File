// Selecting HTML elements for question, answers, and navigation buttons
const question = document.querySelector(`#question`);
const answers = document.querySelector(`#answers`);
let questionURL=`../json-files-questions/${localStorage.getItem("examType")}`

const previousBut = document.querySelector(`.prev-btn`);
const nextBut = document.querySelector(`.next-btn`);
const flagbBtn=document.querySelector(`#flag-btn`);
const submit = document.querySelector(`#submit`);

const currentQuestionNumber = document.getElementById("currentQuestionNumber");
const totalQuestionNumber = document.getElementById("totalQuestionNumber");
// Index to track the current question
let index = 0;

let userAnswers = [];
let questionsContainer =[];


// Exam class to manage question data and difficulty levels
class Exam {
    constructor(data) {
        this.rowData = data;
        this.questions = data['easy'] || [];
        this.size = this.questions.length;
    }

    // Set the questions based on the selected difficulty level
    setDifficulty(level) {
        this.questions = this.rowData[level];
        this.size = this.questions.length;
    }

    // Get all questions data
    getAllData() {
        return this.rowData;
    }

    // Get the current questions and their size
    getQuestions() {
        return {
            question: this.questions,
            size: this.size
        };
    }
}




// Fetching the questions data from the JSON file
setTimeout(function (){
    fetch(questionURL)

        .then((response) => {
            if (!response.ok) {
                document.querySelector(`#responseError`).style.display="block";
                document.querySelector(`#loading`).style.display = 'none';
                throw new Error(`HTTP error! status: ${response.status}`);

            }

            return response.json(); // Parse JSON content from the response
        })
        .then((data) => {

            document.querySelector(`#loading`).style.display = 'none';
            // Initialize the exam with fetched data and display the first question
            questionsContainer = createAnInstant(data);

            displayQuestion(questionsContainer, 0);




        previousBut.addEventListener('click', () => {
            if (index > 0) {  
                previousBut.style.backgroundImage = `url(../svg/buttonClick.svg)`;
                previousBut.style.color = `#ffffff`;
            }
            setTimeout(() => {
                prevButton(questionsContainer)
            }, 180);
        });
        
        
        nextBut.addEventListener('click', () => {  
            if (index < questionsContainer.length - 1) {  
                nextBut.style.backgroundImage = `url(../svg/buttonClick.svg)`;
                nextBut.style.color = `#ffffff`;
            }         
            setTimeout(() => {
                nextButton(questionsContainer)
            }, 180);
        });
                    
        // previousBut.addEventListener('click', () => { setTimeout(() =>{ prevButton(questionsContainer) ,190 } ) } );
        // nextBut.addEventListener('click', () => {setTimeout(() =>{ nextButton(questionsContainer),190 } ) } );
        submit.addEventListener('click',(event) => correctAnswars(event , questionsContainer));

        })
        .catch((error) => {
            // Handle errors fetching the JSON file
            document.querySelector(`#responseError`).children[0].children[1].innerText="Problem in JSON file"
            document.querySelector(`#responseError`).style.display="block";

            document.querySelector(`#loading`).style.display = 'none';

            console.error('Error fetching JSON:', error);
        });
},1000)



