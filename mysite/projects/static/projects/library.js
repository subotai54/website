var myLibrary=[];
var fields= ['id','title', 'author', 'pages', 'borrowed'];
var fLength=fields.length;
var length=0;

function book(id,title, author, pages, borrowed){
    this.id=id;
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.borrowed=borrowed;
}


book.prototype.log = function(){
    return (this.title+" was written by "+this.author+" and has "+this.pages+" pages."+this.borrowed)
}

function render(){
    var aLength = myLibrary.length;
    for (let i=0; i<aLength ; i++){
        inRender(myLibrary[i],i);
    }
}

function inRender(newLine,L){
    if(!($('#r'+myLibrary[L]["id"]).length) )
    {
        $('#data_table').append('<tr id=r'+myLibrary[L]["id"]+'>')
        for (let q = 0; q<fLength; q++){
            $('#r'+myLibrary[L]["id"]).append('<td class='+fields[q]+' id=r'+myLibrary[L]["id"]+fields[q]+'>'+myLibrary[L][fields[q]]+'</td>')
        }
            $('#r'+myLibrary[L]["id"]).append('<td class=delete id=r'+myLibrary[L]["id"]+fields[fLength]+'>Delete</td>')

    }
}

$(document).on('click', '.delete', function(){
    toDelete=$(this).attr('id')
    let matches = toDelete.match(/r(\d+)/);
    $('#'+matches[0]).remove()
    arDelete = matches[0].slice(1)
    for (let d = myLibrary.length - 1; d >= 0; --d) {
        if (myLibrary[d].id == arDelete) {
            myLibrary.splice(d,1);
        }
    }
});

$(document).on('click', '.borrowed', function(){
    let toSwitch=$(this).attr('id')
    console.log(toSwitch)

    if ($('#'+toSwitch).text() == 'borrowed'){
        $('#'+toSwitch).text('not borrowed')
    }
    else{
        $('#'+toSwitch).text('borrowed')
    }
    for (let d = myLibrary.length - 1; d >= 0; --d) {
        if (myLibrary[d].borrowed == 'borrowed') {
            myLibrary[d].borrowed = 'not borrowed'
        }
        else
        {
            myLibrary[d].borrowed = 'borrowed'
        }
    }
});


$(document).on('click', '#headers', function(){
    render();
});

$(document).on('click', '#input_submit', function(){
    if (document.getElementById('input_id').value =='' || document.getElementById('input_title').value =='' || document.getElementById('input_author')=='')
    {
        alert("All fields must be filled out.");
    }
    else
    {
        var borrowedCheck = $("#input_borrowed").is(":checked");
        if (borrowedCheck){
            var checked = 'borrowed';
        }
        else{
            var checked = 'Not borrowed';
        }
        var stuff = new book(document.getElementById('input_id').value,document.getElementById('input_title').value,document.getElementById('input_author').value,document.getElementById('input_pages').value,checked);

        myLibrary.push(stuff);
        inRender(stuff, myLibrary.length - 1);
    }
});



window.onload = function() {
    for (var inp = 0; inp <fields.length; inp++){
        if (fields[inp]=='borrowed'){
        $('#input_fields').append($("<td><input type='checkbox' placeholder="+fields[inp]+" id=input_"+fields[inp]+" value='Not borrowed' checked='borrowed'>borrowed</td>", {id : 'input_'+fields[inp], 'class' : 'table mx-0 my-0'}))
        }
        else
        {
            $('#input_fields').append($("<td><input type='text' placeholder="+fields[inp]+" id=input_"+fields[inp]+"></td>", {id : 'input_'+fields[inp], 'class' : 'table mx-0 my-0'}))
        }
    }
    fields.forEach( function(field){
        $('#headers').append($('<th><h3>'+field+'</h3></th>', {id : field, 'class' : 'table mx-0 my-0'}))
    });

    var example = new book("000","The Eye of the World","Robert Jordan","600","borrowed");
    var example2 = new book("001","EotW","Bordan","700","not borrowed");

    myLibrary.push(example);
    myLibrary.push(example2);
    render();

};