const flagList=document.getElementById("flagList");
const timer= document.getElementById("timer-display")
const flagbut = document.getElementById('flagIcon');

function timeUpdater(noOfMinutes) {
    let time = noOfMinutes * 60;
    let timer = document.getElementById("timer-display"); // Ensure this element exists

    // Initialize timer display
    timer.innerText = `${noOfMinutes >= 10 ? noOfMinutes : noOfMinutes > 1 ? '0' + noOfMinutes : '00'}:00`;

    function updateTime() {
        let min = Math.floor(time / 60);
        let sec = time % 60;

        // Change styles when 1 minute left
        if (time === 60) {
            timer.style.color = "#E90000";
        }

        // Update display
        timer.innerText = `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;

        // Stop and redirect when time is up
        if (time <= 0) {
            clearInterval(intervalTd); // Stop the timer
            window.location.replace(`../time-out/time-out.html`);
        }

        time--; // Decrease time
    }

    let intervalTd = setInterval(updateTime, 1000);
}

timeUpdater(3)   //You can set the time from here





function checkFlag(index){
    if(flagArr.indexOf(index) !== -1 ){
        flagbut.src  = "../svg/flagFill.svg";    
        flagbut.dataset.flag = "flaged";
    }
    else{
        flagbut.src  = "../svg/flagStrock.svg";
        flagbut.dataset.flag = "unFlaged";

    }
}

let flagArr=[];

function flagToggle(btn) {
    // btn.classList.toggle("flagged");  // change the flag style
    if (flagbut.dataset.flag === "unFlaged"){
        flagbut.src  = "../svg/flagFill.svg";
        // flagList.innerHTML+=`<div id="flag${index}" onclick="flagNav(this)"><p style="background-color: #ffa200">Question:${index+1}</p></div>`
        flagList.children[index].style.backgroundImage = `url('../svg/flagActive.svg')`
        flagList.children[index].style.color = '#2D1401';
        flagList.children[index].dataset.flag = 'flaged';
        flagArr.push(index);
        flagbut.dataset.flag = "flaged";

    }
    else if(flagbut.dataset.flag === "flaged"){

        flagbut.src  = "../svg/flagStrock.svg";
        flagArr.splice(flagArr.indexOf(index),1);
        flagList.children[index].style.backgroundImage = `url('../svg/flagDisable.svg')`
        flagList.children[index].style.color = '#c2955d93';
        flagList.children[index].dataset.flag = 'unflaged';
        flagbut.dataset.flag = "unFlaged";
    }
}



// Function to navigate you to the flaged question
function flagNav(e) {

    if (e.dataset.flag === 'flaged'){
        let FQI = Number(e.innerText);  //Flagged question index
        FQI--
        index = FQI
        displayQuestion(questionsContainer , index)
    }

}

