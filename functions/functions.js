const flagList=document.getElementById("flagList");
const timer= document.getElementById("timer-display")
const flagbut = document.getElementById('flagIcon');

function timeUpdater(noOfMinutes){
    let time=noOfMinutes*60;

    // noOfMinutes=noOfMinutes;

    timer.innerText = `${noOfMinutes>=10?noOfMinutes:noOfMinutes>1?'0'+noOfMinutes:'00'}:00`;
function updateTime() {
    // console.log(time)
    let min=Math.floor(time/60);
    if(time<=(noOfMinutes*60)/2){
        timer.style.color = "#E90000";

    }


    let sec=time%60;
    time--
    if(time<0){
        // window.open();
        window.location.href=`../timeout/timeout.html`
        clearInterval(intervalTd)
    }
    document.getElementById("timer-display").innerText = `${min<10?'0'+min:min}:${sec<10?'0'+sec:sec}`;
}
let intervalTd=setInterval(updateTime, 1000);

}
timeUpdater(10)   //You can set the time from here





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
    console.log(flagbut.dataset.flag);
    // btn.classList.toggle("flagged");  // change the flag style
    if (flagbut.dataset.flag === "unFlaged"){
        console.log('love1');
        flagbut.src  = "../svg/flagFill.svg";
        // flagList.innerHTML+=`<div id="flag${index}" onclick="flagNav(this)"><p style="background-color: #ffa200">Question:${index+1}</p></div>`
        flagList.children[index].style.backgroundImage = `url('../svg/Flag active.svg')`
        flagList.children[index].style.color = '#2D1401';
        flagList.children[index].dataset.flag = 'flaged';
        flagArr.push(index);
        flagbut.dataset.flag = "flaged";
        console.log(flagArr);

    }
    else if(flagbut.dataset.flag === "flaged"){
        console.log('love2');

        flagbut.src  = "../svg/flagStrock.svg";
        flagArr.splice(flagArr.indexOf(index),1);
        flagList.children[index].style.backgroundImage = `url('../svg/Flag disable.svg')`
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

