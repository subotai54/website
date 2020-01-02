function makeSquares(total = 64){
    var h=500/total;
    var w=500/total;
    for(var i =1; i<= total; i++){
        $('#main_square').append($('<ul/>', { id: 'r' + i, 'class' : 'sketch-row list-inline  mx-0 my-0'}))

        $('#'+'r'+i).height(h)
        for(var j =1; j<= total; j++){
            $("#"+'r'+i).append($('<div/>', { id: 'r' + i +'j'+ j, 'class' : 'sketch list-inline-item border mx-0'}))
            var newText = 'Sample';
            var newName = 'r'+i+'j'+j;
            $('#'+newName).width(w)
            $('#'+newName).height(h)
        }

    }

    $('#'+'r'+total).addClass("mb-5")
}
$(document).on("mouseenter",".sketch", function() {
    var temp = $(this).css("background-color")
    var rgb = temp.match(/[0-9].+/g);
    var r = rgb[0].split(',')[0];
    var g = rgb[0].split(',')[1];
    var b = rgb[0].split(',')[2];
    var c1 = parseInt(r)-25
    var c2 = parseInt(g)-25
    var c3 = parseInt(b)-25
    $( this ).css("background-color","rgb("+c1+","+c2+","+c3+")");
})




