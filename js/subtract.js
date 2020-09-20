let playing = false;
let score;
let action;
let timeremaining;
let correctAnswer;
//all the used variable for the application

document.getElementById("startreset").onclick=function(){

    if(playing == true){
        location.reload(); //this will relode the page

    }else{
        playing = true;
          score = 0;
          document.getElementById("scorevalue").innerHTML = score;
          show("timeremaining");
          // game will run for 60 seconds
          timeremaining = 60;
          document.getElementById("timeremainingvalue").innerHTML = timeremaining;
          //hide game over bar
          hide("gameOver");
          document.getElementById("startreset").innerHTML = "Reset Game";
          //starts countdown / calls countdown function
          startCountdown();

          // generate question and answer
          generateQA();

    }

}

//clicking on an answer box
for(i=1; i<5; i++){
document.getElementById("box"+i).onclick = function(){
    if(playing == true){
        if(this.innerHTML == correctAnswer){
            //for correct answer
            score +=10;
            document.getElementById("scorevalue").innerHTML = score;
            //hide wrong box and show correct box
            hide("wrong");
            show("correct");
           setTimeout(function(){
               hide("correct");
           },1000);

           //generate new question and answer
           generateQA();

             
        }else{
            hide("correct");
            show("wrong");
           setTimeout(function(){
               hide("wrong");
           },1000);

        }
    }

}

}


//all the needed function down below...
// this function starts countdown

function startCountdown(){
    action = setInterval(function(){
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if(timeremaining == 0){
            // game over
            stopCountdown();
            show("gameOver");
         document.getElementById("gameOver").innerHTML = "<p>Game over!</p><p>Your score is " + score + ".</p>";   
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);    
}


function stopCountdown(){
    clearInterval(action);
}
function hide(Id){
    document.getElementById(Id).style.display = "none";
}
function show(Id){
    document.getElementById(Id).style.display = "block";
}
function generateQA(){
    let x = (1+Math.round(9*Math.random())) * (1+Math.round(9*Math.random()));
    let y = (1+Math.round(9*Math.random())) * (1+Math.round(9*Math.random()));
    correctAnswer = x-y;
    document.getElementById("question").innerHTML = x + "-" + y;
    correctPosition = 1+Math.round(3*Math.random());
    //fill one of the box with correct answer
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer;
    let answer = [correctAnswer];
    //fill other boxs with wrong answer
    for(i=1; i<5; i++){
        if(i != correctPosition){
            let wrongAnswer;
            do{
                wrongAnswer = (1+Math.round(9*Math.random())) * (1+Math.round(9*Math.random()));

            }while(answer.indexOf(wrongAnswer)>-1)
           
            document.getElementById("box"+i).innerHTML = wrongAnswer;

            answer.push(wrongAnswer);
        }
    }
}