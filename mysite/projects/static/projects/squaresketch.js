function makeSquares(total = 4){
    for(var i =1; i<= total; i++){
        $('#main_square').append($('<ul/>', { id: 'r' + i, 'class' : 'w-75 sketch-row list-inline  mx-0 my-0'}))

        for(var j =1; j<= total; j++){
            $("#"+'r'+i).append($('<div/>', { id: 'r' + i + j, 'class' : 'col-auto sketch list-inline-item border mr-0'}))
            var newText = 'Sample';
            var newName = 'r'+i+j;
            $('#'+newName).text(newText);
        }
    }
}
$(document).on("mouseenter",".sketch", function() {
    $( this ).addClass('red');
})