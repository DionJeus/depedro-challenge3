const buttons = document.querySelectorAll('.choice-click');
const main = document.querySelector('#main');
const selection = document.querySelector('#selection');
const resetBtn = document.querySelector('#reset');
const user_select = document.querySelector('#user_select');
const computer_select = document.querySelector('#computer_select');
const result = document.querySelector('#result');
const scoreElement = document.querySelector('#score');


const openBtn = document.querySelector('#rules');
const closeBtn = document.querySelector('#close-modal');
const modal = document.querySelector('#modal');

openBtn.addEventListener('click', toggleModal);
closeBtn.addEventListener('click', toggleModal);

function toggleModal(){
    console.log("sdfds - "+modal.style.display);
    if(modal.style.display === 'none' || modal.style.display === ''){
        modal.style.display = 'flex';
    }else{
        modal.style.display = 'none';
    }
}

const choices = ['paper', 'rock', 'scissors'];
let score = 0;

buttons.forEach(button => {
    button.addEventListener('click', userChoiceClickHandler);
});

resetBtn.addEventListener('click', playAgain);

function playAgain() {
    main.style.display = "flex";
    selection.style.display = "none";

    buttons.forEach(button => {
        button.classList.add('spin');
        
        setTimeout(() => {
            button.classList.remove('spin');
        }, 1000);
    });
}

function userChoiceClickHandler(e){
    const userChoice = this.getAttribute('data-choice');
    playGame(userChoice);
    
}

function playGame(userChoice){
    const computerChoice = pickChoiceRandom();
    checkWinner(userChoice, computerChoice);

    selection.classList.add('fade-in');
    
    setTimeout(() => {
        selection.classList.remove('fade-in'); 
    }, 1000); 

}


function pickChoiceRandom(){
    return choices[Math.floor(Math.random() * choices.length)];
}

function checkWinner(userChoice, computerChoice){


    updateSelection(user_select, userChoice);
    updateSelection(computer_select, computerChoice);

    if(userChoice === computerChoice){
        result.innerText = "draw";
    }else if(userChoice === 'paper' && computerChoice === 'rock' ||
            userChoice === 'rock'  && computerChoice === 'scissors' ||
            userChoice === 'scissors'  && computerChoice === 'paper')
    {
        result.innerText = "win";
        updateScore(1);
    }else{

        result.innerText = "lost";
        updateScore(-1);
    }


    main.style.display = "none";
    selection.style.display = "flex";

}

function updateScore(value){
    score += value;
    if(score < 0) { score = 0;}
    scoreElement.innerText = score;
   

}

function updateSelection(selectionElement, choice){
    selectionElement.classList.remove('btn-paper');
    selectionElement.classList.remove('btn-rock');
    selectionElement.classList.remove('btn-scissors');

    selectionElement.classList.add(`btn-${choice}`);

    const img = selectionElement.querySelector('img');
    img.src = `./images/icon-${choice}.svg`;
    img.alt = choice;
}

function userChoiceClickHandler(e) {
    const userChoice = this.getAttribute('data-choice');

    // Add spin animation class
    this.classList.add('animate-spin');

    // Remove the animation class after the animation ends
    setTimeout(() => {
        this.classList.remove('animate-spin');
    }, 2000); // Duration matches the CSS animation

    playGame(userChoice);
}