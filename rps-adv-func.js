let score=JSON.parse(localStorage.getItem('score')) || {
        wins: 0,
        losses: 0,
        ties: 0
    };

    updateScoreElement();

/*if (!score) {
    score = {
        wins: 0,
        losses: 0,
        ties: 0
    };
}*/

let isAutoPlaying = false;
let intervalId;

//const autoPlay=()=>{          // Arrow function syntax

//};

function autoPlay(){
    if(!isAutoPlaying){   
        intervalId=setInterval(()=>{
            const playerMove=pickComputerMove();
            playGame(playerMove);
        },1000); 
        isAutoPlaying = true;       
    }else{
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}

document.querySelector('.js-rock-button')
    .addEventListener('click',()=>{
        playGame('Rock');
    });

document.querySelector('.js-paper-button')
    .addEventListener('click',()=>{
        playGame('Paper');
    });

document.querySelector('.js-scissors-button')
    .addEventListener('click',()=>{
        playGame('Scissors');
    });

document.body.addEventListener('keydown',(event)=>{
    if(event.key==='r' || event.key==='R'){
        playGame('Rock');
    }
    else if(event.key==='p' || event.key==='P'){
        playGame('Paper');
    }
    else if(event.key==='s' || event.key==='S'){
        playGame('Scissors');
    }
    else if(event.key==='a' || event.key==='A'){
        autoPlay();
    }
})

function playGame(playerMove){
    const computerMove = pickComputerMove();
    let result = '';
    if(playerMove === 'Rock'){
        if(computerMove === 'Rock'){
            result = 'It\'s a tie!';
        }
        else if(computerMove === 'Paper'){
            result = 'You Lose!';
        }
        else{
            result = 'You win!';
        }
    }
    else if(playerMove === 'Paper'){
        if(computerMove === 'Rock'){
            result = 'You win!';
        }
        else if(computerMove === 'Paper'){
            result = 'It\'s a tie!';
        }
        else{
            result = 'You Lose!';
        }
    }
    else if(playerMove === 'Scissors'){
        if(computerMove === 'Rock'){
            result = 'You Lose!';
        }
        else if(computerMove === 'Paper'){
            result = 'You win!';
        }
        else{
            result = 'It\'s a tie!';
        }
    }
    if(result === 'You win!'){
        score.wins++;
    }
    else if(result === 'You Lose!'){
        score.losses++;
    }
    else{
        score.ties++;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML=result;
    document.querySelector('.js-moves').innerHTML = `You <img src="images/${playerMove}-emo.png " class="move-icon"><img src="images/${computerMove}-emo.png" class="move-icon">Computer`;

}

function updateScoreElement(){
    document.querySelector('.js-score').innerText = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove(){
    let computerMove='';
    const randomnum = Math.random();
    if(randomnum >=0 && randomnum<1/3){
        computerMove = 'Rock';
    }
    else if(randomnum >= 1/3 && randomnum < 2/3){
        computerMove = 'Paper';
    }
    else{
        computerMove = 'Scissors';
    }
    return computerMove;
}

