// --------------------------------Gameboard OBJECT (SINGLETON/IIFE)----------------
let gameboard = function(){
    let state = [["", "", ""], ["", "", ""], ["", "", ""]];
    let winner;
    let movesMade = 0;
    let winnerFoundYet = false
  
    function startMakingMoves () {
       if (!player.movesFirst()) {
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

    function gameTied () {
     if (winnerFoundYet == false && movesMade == 9){

        return true
     }
     else return false
    }

    function updateGameState (marker, selectedTile) {
        let i = Math.floor(selectedTile/10);
        let j = selectedTile%10;

        // updates state array
        state[i][j] = `${marker}`;

        // renders the marker on gui
        displayController.placeMarker(marker, i, j);
        // console.table(state);
    }

    
    function checkWinner (marker, position) {
        let row = Math.floor(position/10);
        let column = position%10;
        let winnerFound = false;

        // check in rows
        for (let i = 0; i < 3; i++){
            if (i != column){
                if (state[row][i] != marker){
                    winnerFound = false;
                    break;
                }
                else {
                    winnerFound = true;
                    continue;
                }
            }
            else continue
        }
        
        // check in columns
        if (winnerFound == false){
            for (let i = 0; i < 3; i++){
                if (i != row){
                    if (state[i][column] != marker){
                        winnerFound = false;
                        break;
                    }
                    else {
                        winnerFound = true;
                        continue;
                    }   
                }
                else continue
            }
        }
     
        // check diagonally todo
        if (winnerFound == false && (row == column || row + column == 2)){
            if (row == column){
                for (let i = 0; i < 3; i++){
                    if (i != row){
                        if (state[i][i] != marker){
                            winnerFound = false;
                            break
                        }
                        else {
                            winnerFound = true;
                            continue;
                        }
                    }
                    else continue
                }
            }
             if(row + column == 2 && winnerFound == false){
                for (let i = 0; i < 3; i++){
                    if (i != row){
                        if (state[i][2 - i] != marker){
                            winnerFound = false;
                            break
                        }
                        else {
                            winnerFound = true;
                            continue;
                        }
                    }
                    else continue
                }
            }         
        }
        winner = marker;
        movesMade ++;
        winnerFoundYet = winnerFound == true ? true : false;
        return winnerFound;
    }

    function resetBoard (){
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                state[i][j] = "";
            }
        }
        winnerFoundYet = false;
        movesMade = 0;
    }
    
    function getWinner () {
        // console.log(winner);
        return winner;
    }

    return {
        availableMoves,
        startMakingMoves,
        updateGameState,
        checkWinner,
        resetBoard,
        getWinner,
        gameTied,
    }
}();

// --------------------------------PLAYER OBJECT (SINGLETON/IIFE) ----------------------------------------------------

let player = function () {
    let selection;

    function getSelection () {
        return selection
    }

    function setSelection(a) {
        selection = a;
        // console.log(`player selection is ${selection}\nMoves first = ${movesFirst}`);
    }
    function movesFirst () {
        if (selection == "X"){
            return true
        }
        else return false
    }
    // todo
    function makeMove (e){
        // console.log(e.target.dataset.position);
        gameboard.updateGameState(selection, e.target.dataset.position);

        // check for winner, if found reset board, else make ai make a new move
        if(gameboard.checkWinner(selection,e.target.dataset.position)
        ){
            // gameboard.reset()
            gameboard.resetBoard();
            // reset gui
            setTimeout(displayController.resetGUI, 1000)
            // gui.showWinner()
            displayController.displayWinner(selection);
            displayController.incrementCounter(selection);       
        }
        else if (gameboard.gameTied() == true) {
            displayController.incrementCounter();

            // display winner dialogue TODO
            displayController.displayWinner();
        }
        else {
            setTimeout(computerAI.makeMove, 1000);
        }
    }

    return {
        getSelection,
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
    }

    function getSelection () {
        return selection;
    }
    // make move
    function makeMove () {
        let availableMovesArray = gameboard.availableMoves();
        let choice = Math.floor(Math.random() * ((availableMovesArray.length - 1) - 0 + 1));
        gameboard.updateGameState(selection, availableMovesArray[choice]);  
        
        // CHECKWINNER
        if(gameboard.checkWinner(selection, availableMovesArray[choice])
        ){
            // resetboard
            gameboard.resetBoard();
            // reset gui
            setTimeout(displayController.resetGUI, 1000)
            // show winner
            displayController.displayWinner(selection);
            displayController.incrementCounter(selection)
        }

       else if (gameboard.gameTied() == true) {
            displayController.incrementCounter();
            displayController.displayWinner()
        }
    }

    return {
        setSelection,
        makeMove,
        getSelection
    }
}();

// -------------------------------------------------------------------------GUI OBJECT----------------------------------------------------------------------------

let displayController = function (){
    let startGame = document.getElementById('start-game')
    let roundResult = document.getElementById('round-result');
    let restart = document.getElementById('restart');
    let mark = document.getElementsByClassName('selection-option');
    let gridCell = document.getElementsByClassName('grid-cell');
    let gridSelection = document.getElementsByClassName('mark')
    let resultMark = document.getElementsByClassName('mark-result')
    let result = document.getElementById('result')
    let reset = document.getElementById('reset')
    let quitNO = document.getElementById('no')
    let quitYES = document.getElementById('yes')
    let quit = document.getElementById('quit')
    let nextRound = document.getElementById('next-round')
    let scoreWins = document.getElementById('score-you')
    let scoreTies = document.getElementById('ties')
    let scoreLosses = document.getElementById('score-cpu')

    let wins = Number(scoreWins.children[1].innerText);
    let losses = Number(scoreLosses.children[1].innerText);
    let ties = Number(scoreTies.children[1].innerText); 

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

    function resetGUI () {
        for (let i = 0; i < gridSelection.length; i++){
            gridSelection[i].setAttribute('src', "");
        }
    }

    function incrementCounter (winnerMark){
        // TODO
        if (winnerMark == computerAI.getSelection()){
            losses+= 1;
            (scoreLosses.children[1].innerText)= losses;
        }
        else if (winnerMark == player.getSelection()){
            wins += 1;
            (scoreWins.children[1].innerText) =  wins;
        }
        else {
            ties+=1;
            (scoreTies.children[1].innerText) = ties;
        }
    }

    function displayWinner(selection) {

        if (selection == undefined) {
            result.innerText = "ROUND TIED!";
            resultMark[0].children[0].innerText = "";
            resultMark[0].children[1].innerText = "NO WINNER THIS ROUND!";
        }
        else {
        result.innerText = player.getSelection() == selection ? "YOU WON!" : "YOU LOST!";
        resultMark[0].children[0].innerText = selection;
        resultMark[0].children[1].innerText = "TAKES THE ROUND!";

    }
        roundResult.style.visibility = "visible";
        quit.addEventListener("click", () =>{
            location.reload();
        }, {once:true})

        nextRound.addEventListener('click', () =>{
            // TODO
            roundResult.style.visibility = "hidden"
            resetGUI();
            gameboard.resetBoard();

            // new event listeners for the next round
            for (let i = 0; i< gridCell.length; i++){
                gridCell[i].addEventListener('click', player.makeMove, {once: true})
            }
            gameboard.startMakingMoves()
        }, {once:true})
      }

    function quitRound () {
        restart.style.visibility = "visible";
        quitNO.addEventListener('click',() =>{
            restart.style.visibility = "hidden"
        })
        quitYES.addEventListener('click', () => {
            location.reload()
        })
    }

    return {
        reset,
        gridCell,
        mark,
        startGame,
        setPlayerAndComputerChoice,
        showGameBoardAndHideNewGame,
        placeMarker,
        resetGUI,
        displayWinner,
        quitRound,
        incrementCounter
    }
}();

// -------------------------------------------------------MAIN------------------------------------------------------------------

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

// quit round
displayController.reset.addEventListener('click', displayController.quitRound);