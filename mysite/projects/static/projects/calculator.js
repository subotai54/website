function makeCalc(){
    const digit = 9
    const w = 60
    const h = 60
    for(var i =1; i<= 3; i++){
        $('#calculator').append($('<ul/>', { id: 'r' + i, 'class' : 'sketch-row list-inline  mx-0 my-0'}))
        $('#'+'r'+i).height(h)

        for(var j =1; j<= 3; j++){
            $("#"+'r'+i).append($('<div/>', { id: digit, 'class' : 'digit list-inline-item border mx-0 my-0 text-center'}))
            var newName = digit;
            $('#'+newName).width(w)
            $('#'+newName).height(h)
            $('#'+newName).text(digit)
            digit = digit - 1
            }

        if (i==3){
            $("#"+'r'+i).append($('<div/>', { id: digit, 'class' : 'digit list-inline-item border mx-0 my-0 text-center'}))
            var newName = digit;
            $('#'+newName).width(w)
            $('#'+newName).height(h)
            $('#'+newName).text(digit)
            digit = digit - 1

            $("#"+'r'+i).append($('<div/>', { id: 'd', 'class' : 'digit list-inline-item border mx-0 my-0 text-center'}))
            var newName = 'd';
            $('#'+newName).width(w)
            $('#'+newName).height(h)
            $('#'+newName).text('.')
        }

    }

    var operators = ["+","-","X","/"]
    $('#calculator').append($('<ul/>', { id: 'r' + i, 'class' : 'sketch-row list-inline  mx-0 my-0'}))

    for (var o = 0; o<=3; o++)
    {
        $("#"+'r'+i).append($('<div/>', { id: 'r' + i +'o'+ o, 'class' : 'oper list-inline-item border mx-0 my-0 text-center'}))
        newName = 'r' + i +'o'+ o
        $('#'+newName).width(w)
        $('#'+newName).height(h)
        $('#'+newName).text(operators[o])
        $('#'+newName).css("background-color","rgb(200,200,200)");

    }
    i++;
    var machineKeys = ['*','CE']
    $('#calculator').append($('<ul/>', { id: 'r' + i, 'class' : 'sketch-row list-inline  mx-0 my-0'}))

    for (var k = 0; k<=1; k++)
    {
        $("#"+'r'+i).append($('<div/>', { id: 'r' + i +'k'+ k, 'class' : 'oper list-inline-item border mx-0 my-0 text-center'}))
        newName = 'r' + i +'k'+ k
        $('#'+newName).width(w)
        $('#'+newName).height(h)
        $('#'+newName).text(machineKeys[k])
        $('#'+newName).css("background-color","rgb(200,200,200)");

    }
}

