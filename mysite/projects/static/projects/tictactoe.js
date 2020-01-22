var gameBoard = (function() {
    var gameType = 2 //1 for single, 2 for two player
    var _board = [0,0,0,0,0,0,0,0,0,0]; //init board
    var _players=[]; // holds player objects
    const _wins = [[1,4,7],[2,5,8],[3,6,9],[1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7]]; //possible win conditions
    var count = 0; //used for determining ties
    var counter = 0; //used for AI

    function setPlayers (oneTwo){
        gameType = oneTwo;
    }

    function getPlayers (){
        return gameType;
    }

    function AI(nBoard = _board.slice(), dec = 0){ //1 is AI, 0 is human
    aBoard=nBoard.slice()
        var result = 0;
        var resultPos = 1;
        for (let a = 1; a<9; a++){
            if (aCheckBlank(a,aBoard) == true)
                {
                    resultPos=a;
                }
        }

        if (dec ==0){
            dec=1
        }
        else{
            dec=0
        }
        counter=0;

        for (let a = 1; a<9; a++){
            counter++;
            if (aCheckBlank(a,aBoard) == true){
                if (dec==1)
                {
                    aBoard[a]='X'
                }
                else{
                    aBoard[a]='O'
                }
                if (dec==1){
                    var branch = AI(aBoard,dec)
                    if (branch > result){
                        result = branch;
                        resultPos=a;
                    }
                }
                else{
                    var branch = AI(aBoard,dec)
                    if (branch < result){
                        result = branch;
                        resultPos = a;
                    }
                }



            }
        }
        if (counter==9){
            if (aCheckWin(aBoard) && dec==0){
                return 10;
            }
            else if (aCheckWin(aBoard) && dec==1){
                return -10;
            }
            else{
                return 0;
            }
        }
        return resultPos;
    }


    function aCheckWin(newBoard){ //outputs true if the board matches a win condition from _wins or false otherwise
        for (let p = 0; p<8; p++)
        {
            if (newBoard[_wins[p][0]] == newBoard[_wins[p][1]] && newBoard[_wins[p][2]] == newBoard[_wins[p][1]])
            {
                if (newBoard[_wins[p][0]] != 0)
                {
                    return true;
                }
            }
        }
        return false;
    }
    function aCheckBlank(pos,cBoard){ //checks if a spot is blank. Board is numbered like an ATM, top row is position 1,2,3
        if (cBoard[pos] == 0){
            return true

        }
        else return false
    }

    function checkWin(){ //outputs true if the board matches a win condition from _wins or false otherwise
        for (let m = 0; m<8; m++)
        {
            if (_board[_wins[m][0]] == _board[_wins[m][1]] && _board[_wins[m][2]] == _board[_wins[m][1]])
            {
                if (_board[_wins[m][0]] != 0)
                {
                    return true;
                }
            }
        }
        return false;

    };
    function activePlayer(){ //returns the player object for the active player
        return _players[1];
    }

    function changeActive(){ //switches order of players
        _players.push(_players[0]);
        _players.shift();
        return;
    }

    function checkBlank(pos){ //checks if a spot is blank. Board is numbered like an ATM, top row is position 1,2,3
        if (_board[pos] == 0){
            return true

        }
        else return false
    }

    function addPlayers(pl1,pl2){ //adds player objects to array
        _players=[]
        _players.push(pl1)
        _players.push(pl2)
        return;
    }

    function clicked(pos, activePlayer){ // if the spot is empty, changes the display to active player's mark, checks for win and tie, then changes player
        if (checkBlank(pos)){
            count++;
            let act = gameBoard.activePlayer()

            displayControl.changeDisplay(pos, act.sayMark())
            _board[pos]=act.sayMark()
            if (checkWin()){
                displayControl.win(act);
            }
            else{
                if (count==9){
                    displayControl.tie();
                }
                changeActive()
            }
        }
        return;
    };

    function reset(){ //resets board array and display
        _board = [0,0,0,0,0,0,0,0,0,0];
        count = 0;
        for (let z=1; z<10;z++){
            displayControl.changeDisplay(z,'')
        }
    };

    return {
        clicked,
        reset,
        checkBlank,
        activePlayer,
        addPlayers,
        AI,
        setPlayers,
        getPlayers
    }
}());

var displayControl = (function() { //takes input from the gameboard and uses it to change the display. Does not change the gameBoard

    function changeDisplay(pos,mark){
        $('#input_'+pos).text(mark)
        console.log(mark)
        console.log(pos)
    }

    function activePlayer (){
        let act = gameBoard.activePlayer()
        $('#activePlayer').text(act.sayName())
        console.log(act.sayName())
    }

    function win(winner){
        document.getElementById("gameBoard").style.display = "none";
        document.getElementById("winMessage").style.display = "block";
        $('#winMessage').text(winner.sayName()+" wins! Click here to play again.")
    }

    function tie(){
        document.getElementById("gameBoard").style.display = "none";
        document.getElementById("tieMessage").style.display = "block";
    }

    return{
        changeDisplay,
        activePlayer,
        win,
        tie
    }
}());

var player = (name, symbol) => { //player object with name/symbol
    const sayName = () => name
    const sayRecord = () => {wins,losses,ties}
    const sayMark = () => symbol

    var wins = 0;
    var losses = 0;
    var ties = 0;

    return {sayName, sayRecord, sayMark}
}


$(document).on('click', '.board', function(){ //when click board, gets the spot # from the id and sends it to the gameBoard and displayControl
    console.log('click')
    let toSwitch=$(this).attr('id')
    let matches = toSwitch.match(/(\d+)/);
    gameBoard.clicked(matches[0]);
    displayControl.activePlayer();
    if (gameBoard.getType() ==1)
    {
        let pick = gameBoard.AI();
        gameBoard.clicked(pick);
        displayControl.activePlayer();
    }
});

$(document).on('click', '#nameSubmit', function(){ // Takes names and symbols, checks to see if empty, and randomly picks a first player. Sets input to readonly, can't change name after submit.
                                                   // Resets the gameboard in case they started playing with default names since they can change the symbols.
    console.log('name')

    nameOne = document.getElementById('player1').value
    nameTwo = document.getElementById('player2').value

    let sym1 = document.getElementById('sym1').value
    let sym2 = document.getElementById('sym2').value

    let oneTwo = document.querySelector('input[name="numPl"]:checked').value;
    gameBoard.setPlayers(oneTwo);

    if (sym1 == ''){
        sym1='X'
    }
    if (sym2 == ''){
        sym2='O'
    }
    console.log(sym1)

    humOne = player(nameOne,sym1);
    humTwo = player(nameTwo,sym2);
    if(Math.round(Math.random()) == 1)
    {
        gameBoard.addPlayers(humOne, humTwo)
    }
    else
    {
        gameBoard.addPlayers(humTwo, humOne)
    }


    gameBoard.reset()
    console.log(humOne.sayName())
    var temp = gameBoard.activePlayer()
    console.log(temp.sayName())
    displayControl.activePlayer()

});

$(document).on('click', '.endMsg', function(){ // if end of game message clicked, it hides the message and brings back the board. End of game message is shown from gameBoard checkwin
    gameBoard.reset()
    document.getElementById("gameBoard").style.display = "inline-table";
    document.getElementById("winMessage").style.display = "none";
    document.getElementById("tieMessage").style.display = "none";

});

$(document).ready ( function() { //creates the table with id input_#, where # is the spot on the board
    let digit=1;
    for (let m = 0; m<3; m++){
        $('#gameBoard').append($("<tr>", {id : 'r'+m, 'class' : 'mx-0 my-0'}))
        for (let n = 0; n <3; n++){
            $('#r'+m).append($("<td>", {id : 'input_'+digit, 'class' : 'board'}))
            digit++;
            }
        $('#r'+m).append($("</tr>", {id : 'r'+m, 'class' : 'table mx-0 my-0'}))

    }
    humOne = player('Player Two','O'); //default players
    humTwo = player('Player One','X');
    gameBoard.addPlayers(humOne, humTwo)
    displayControl.activePlayer()
});