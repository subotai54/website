
$(document).on('click', '#Rock', function(){
    endGame(1)
});

$(document).on('click', '#Paper', function(){
    endGame(2)
});

$(document).on('click', '#Scissors', function(){
    endGame(3)
});

// 1-rock 2-paper 3-scissors

function endGame(player){
    var ai=Math.floor(Math.random()*3)+1;
    var ai_obj=findObj(ai)
    if (player==ai){
        $('#results').text("You throw "+findObj(player)+" against "+findObj(ai)+"! Tie!")
        $('#tie').text(parseInt($('#tie').text())+1)
    }
    else if (player==1 && ai==3 || player==2 && ai==1 || player==3 && ai==2){
        $('#results').text("You throw "+findObj(player)+" against "+findObj(ai)+"! You win!")
        $('#win').text(parseInt($('#win').text())+1)
    }

    else if (player==1 && ai==2 || player ==2 && ai==3 || player ==3 && ai==1){
        $('#results').text("You throw "+findObj(player)+" against "+findObj(ai)+"! You lose!")
        $('#lose').text(parseInt($('#lose').text())+1)
    }

}

function findObj(number){
    if (number==1){
        return "Rock";
    }
    else if (number==2){
        return "Paper";
    }
    else if (number==3){
        return "Scissors";
    }
}