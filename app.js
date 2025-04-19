// Selecting DOM elements
let boxes = document.querySelectorAll('.box');
let resetButton = document.querySelector('#reset-btn');
let newGameButton = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');

let turnO = true; // true for O's turn, false for X's

// All possible winning combinations
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Reset Game Function
const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add('hide');
};

// Function to disable all boxes
const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

// Function to enable all boxes and clear text
const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

// Show Winner Message
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove('hide');
    disableBoxes();
};

// Check for a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return;
            }
        }
    }
};

// Check for a draw
const checkDraw = () => {
    let allFilled = true;
    boxes.forEach((box) => {
        if (box.innerText === "") {
            allFilled = false;
        }
    });
    if (allFilled) {
        msg.innerText = "It's a Draw!";
        msgContainer.classList.remove('hide');
        disableBoxes();
    }
};

// Add click events to each box
boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
        checkDraw();
    });
});

// Event listeners for buttons
newGameButton.addEventListener('click', resetGame);
resetButton.addEventListener('click', resetGame);

