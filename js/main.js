// --------------------------------PLAYER module ------------------

let player = function () {
    let selection;

    function setSelection(a) {
        selection = a;
        // console.log(`player selection is ${selection}`);
    }

    return {
        setSelection,

    }
}();


// ------------------------COMPUTER module--------------------------------

let computerAI = function () {
    let selection;

    function setSelection(a) {
        selection = a;
        // console.log(`computer selection is ${selection}`);
    }


    return {
        setSelection,
    }
}();

// -------------------------GUI module-----------------------------------

let displayController = function (){
    let newGame = document.getElementById('new-game');
    let mark = document.getElementsByClassName('pick-mark');
    let startGame = document.getElementById('start-game')

    let container = document.getElementById('container');

    let roundResult = document.getElementById('round-result');

    let restart = document.getElementById('restart');

   

    function showGameBoardAndHideNewGame () {
        newGame.style.visibility = "hidden";
        container.style.visibility = "visible";
    }

    // adds event list. for player's choice on start screen
    for (let i = 0; i < mark.length; i++){
        mark[i].addEventListener('click', e => {
            if (e.target.getAttribute('data-mark') == 'O') {
                       player.setSelection('O');
                       computerAI.setSelection('X');
                    }
                    else {
                        player.setSelection('X');
                        computerAI.setSelection('O');
                    }     
        }, {once: true})
    }

    // makes gameboard visible after clicking start game and  hides start game screen
    startGame.addEventListener('click', showGameBoardAndHideNewGame);
        
    return {
        
    }

}();




// -------------------------------main application logic----------------------

