//Run Sound
var runSound = new Audio("run.mp3");

//Jump Sound
var jumpSound = new Audio("jump.mp3");

//Dead Sound

var deadSound = new Audio("dead.mp3");

// Key Event

function keyCheck(event) {
    //Enter Key

    if (event.which == 13) {


        if (runWorkerId  == 0) {
            runWorkerId = setInterval(run , 100);
            runSound.play();
            
            
            moveBackgroundWokerId = setInterval(moveBackground , 100);
            scoreWorkerId = setInterval(updateScore , 100);
            createBlockWorkerId = setInterval(creatBlock,100);
            moveBlockWorkerId = setInterval(moveBlock,100);
            

        }
        
    }

    //Space Key


    if(event.which == 32){


        if(jumpWorkerId == 0){
        
            clearInterval(runWorkerId);
            runSound.pause();
            runWorkerId = -1;

            jumpWorkerId = setInterval(jump,100);
            jumpSound.play();

        }
    }

    
}

//Boy

var boyId = document.getElementById("boy");

//Boy Run
var runWorkerId = 0;
var runImageNumber = 1;

//Boy Run

function run() {

    runImageNumber++; 

    // Run Image Crash

    if (runImageNumber == 9) {
        runImageNumber = 1;

        
    }

    boyId.src = "Run (" + runImageNumber +").png";
    
}

//Boy Jump
var jumpWorkerId = 0;
var jumpImageNumber = 1;
var boyMarginTop = 355; 

//Boy jump

function jump(){

    jumpImageNumber++;

    // Jump Fly
    if(jumpImageNumber <=7 ){
        boyMarginTop = boyMarginTop - 30;
        boyId.style.marginTop = boyMarginTop + "px";


    }

    //Jump Land
    if(jumpImageNumber >= 8 ){
        boyMarginTop = boyMarginTop + 30;
        boyId.style.marginTop = boyMarginTop + "px"

    }



    //Jump Image Crash

    if (jumpImageNumber == 13) {
        jumpImageNumber = 1;


        clearInterval(jumpWorkerId);
        runWorkerId = setInterval (run,100);
        runSound.play();

        jumpWorkerId = 0; 
         
                // Starting a Jump
                if(scoreWorkerId == 0){
                    scoreWorkerId = setInterval(updateScore,100)
                }

                //Move Background
                if (moveBackgroundWokerId == 0){
                    moveBackgroundWokerId = setInterval(moveBackground,100)
                }

                //Create Block
                if (createBlockWorkerId == 0){
                    createBlockWorkerId = setInterval(creatBlock,100)            
                }
                
                //Move Block
                if (moveBlockWorkerId == 0){
                    moveBlockWorkerId= setInterval(moveBlock,100)
                }



        
    }

    boyId.src = "Jump ("+jumpImageNumber+").png";
}

//background

var  backgrounId = document.getElementById("background")
var positionX = 0;
var moveBackgroundWokerId = 0

function moveBackground(){
    positionX = positionX - 20;
    backgrounId.style.backgroundPositionX = positionX + "px";

}

// Score
var scoreId = document.getElementById("score");
var newScore = 0;
var scoreWorkerId = 0;

function updateScore(){

    newScore ++;
    scoreId.innerHTML = newScore;


}

//Create block
var createBlockWorkerId = 0;
var blockMarginLeft = 500;
var blockNumber = 1;
 
function creatBlock(){

   var block = document.createElement("div");
   block.className = "block";
   block.id = "block" + blockNumber;

   blockNumber ++;

   var gap = Math.random()*(1000-400)+400;

   blockMarginLeft = blockMarginLeft + gap;
   block.style.marginLeft = blockMarginLeft + "px";

   document.getElementById("background").appendChild(block);

}

//Move block
var moveBlockWorkerId = 0;

function moveBlock(){

    for(var i=1; i<= blockNumber; i++){
        
        var currentBlock = document.getElementById("block" + i)//cathch Block
        var currentBlockMarginLeft = currentBlock.style.marginLeft;//MarginLeft ?
        var newBlockMarginLeft = parseInt(currentBlockMarginLeft) - 20;//MarginLeft - ()

        currentBlock.style.marginLeft = newBlockMarginLeft + "px";

       // alert(newBlockMarginLeft);
       //132 - 32

       if(newBlockMarginLeft <132 & newBlockMarginLeft > 32){

        //alert(boyMarginTop)
        //280
        //alert("Dead");

              if(boyMarginTop > 280){

                clearInterval(runWorkerId);
                runSound.pause();

                clearInterval(jumpWorkerId);
                jumpWorkerId = -1;


                clearInterval(jumpWorkerId);
                clearInterval(scoreWorkerId);
                clearInterval(moveBackgroundWokerId);
                clearInterval(moveBlockWorkerId);
                clearInterval(createBlockWorkerId);

                deadWokerId = setInterval(dead,100);
                deadSound.play();

                //alert ("Dead");


              }

          }

    }

}

//Boy Dead

var deadImageNumber = 1;
var deadWokerId = 0;

function dead (){
    deadImageNumber ++;

    //Dead Image Crash

    if(deadImageNumber == 11){
        deadImageNumber = 10;

        boyId.style.marginTop = "355px";

        document.getElementById("endScreen").style.visibility = "visible";
        document.getElementById("endScore").innerHTML = newScore;
    }

    boyId.src = "Dead ("+ deadImageNumber +").png"
}




//Page Reloade()

function reload(){

    location.reload();



}
    

    
//https://drive.google.com/drive/u/0/folders/1PFSHxgzD4JbSYszQ5lL45B00vyNZ_jYG