// --------------------------------Gameboard module----------------
let gameboard = function(){
    let state = [["", "", ""], ["", "", ""], ["", "", ""]];
    let winnerFound = false;

    function startMakingMoves () {
       if (!player.movesFirst) {
           computerAI.makeMove();
       }   
    }

    function availableMoves () {
        let availableMoves = [];
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if (state[i][j] == "") {
                    availableMoves.push(`${i}${j}`)
                }
            }
        }
        return availableMoves;   
    }

    function updateGameState (marker, selectedTile) {
        let i = Math.floor(selectedTile/10);
        let j = selectedTile%10;

        // updates state array
        state[i][j] = `${marker}`;

        // renders the marker on gui
        displayController.placeMarker(marker, i, j);
        

        console.table(state);
    }

    return {
        availableMoves,
        winnerFound,
        startMakingMoves,
        updateGameState,
    }
}();

// --------------------------------PLAYER module ------------------

let player = function () {
    let selection, movesFirst;

    function setSelection(a) {
        selection = a;
        movesFirst = a == "X" ? true : false;
        // console.log(`player selection is ${selection}\nMoves first = ${movesFirst}`);
    }

   
    // todo
    function makeMove (e){
        // console.log(e.target.dataset.position);
        gameboard.updateGameState(selection, e.target.dataset.position);
        // checkWinner TODO

        computerAI.makeMove();

    }

    return {
        movesFirst,
        setSelection,
        makeMove,
    }
}();


// ------------------------COMPUTER module--------------------------------

let computerAI = function () {
    let selection;
    function setSelection(a) {
        selection = a;
        // console.log(`computer selection is ${selection}`);
    }

    // make move
    function makeMove () {
        let availableMovesArray = gameboard.availableMoves();
        let choice = Math.floor(Math.random() * ((availableMovesArray.length - 1) - 0 + 1));
        gameboard.updateGameState(selection, availableMovesArray[choice]);     

        // CHECKwINNER TODO
    }

    return {
        setSelection,
        makeMove,
    }
}();

// -------------------------GUI module-----------------------------------

let displayController = function (){
   
    let startGame = document.getElementById('start-game')
    let roundResult = document.getElementById('round-result');
    let restart = document.getElementById('restart');
    let mark = document.getElementsByClassName('pick-mark');
    let gridCell = document.getElementsByClassName('grid-cell');

    function showGameBoardAndHideNewGame () {
        let newGame = document.getElementById('new-game')
        let container = document.getElementById('container');   
        newGame.style.visibility = "hidden";
        container.style.visibility = "visible";
    }

    function setPlayerAndComputerChoice (e) {     
            if (e.target.getAttribute('data-mark') == 'O') {
                       player.setSelection('O');
                       computerAI.setSelection('X');
                    }
                    else {
                        player.setSelection('X');
                        computerAI.setSelection('O');
                    } 

        // removes eventListeners from the start screen after player's selection
        for (let i = 0; i < mark.length; i++){
            mark[i].removeEventListener('click', setPlayerAndComputerChoice);
        }        
    }
    
    function placeMarker(marker, iIndex, jIndex) {
        let element;
        for (let i= 0; i < gridCell.length; i++){
           if(gridCell[i].dataset.position == `${iIndex}${jIndex}`){
               element = gridCell[i];     
               break;
            //    console.log(gridCell[i]);
           }
        }
        // places the marker
        let src = marker == 'X' ? 'icon-x.svg' : "icon-o.svg" ;
        element.children[0].setAttribute('src', `./assets/${src}`);

        // removes eventListener so player can't override AI's choice 
        element.removeEventListener('click', player.makeMove);
    }
    

    return {
        gridCell,
        mark,
        startGame,
        setPlayerAndComputerChoice,
        showGameBoardAndHideNewGame,
        placeMarker,
    }

}();

// -------------------------------main application logic----------------------

// adds eventList on start screen choices
for (let i = 0; i < displayController.mark.length; i++){
    displayController.mark[i].addEventListener('click', displayController.setPlayerAndComputerChoice, {once: true})
}

// makes gameboard visible after clicking start game and  hides start game screen
displayController.startGame.addEventListener('click', displayController.showGameBoardAndHideNewGame, {once: true});
    
// adds event listeners on grid cell
displayController.startGame.addEventListener('click', () => {  
    for (let i = 0; i< displayController.gridCell.length; i++){
        displayController.gridCell[i].addEventListener('click', player.makeMove, {once: true})
    }
}, {once: true});

// start the game with player and ai alternating their movies till winner is found
displayController.startGame.addEventListener('click', gameboard.startMakingMoves, {once: true})