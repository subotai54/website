var myLibrary=[];
var fields= ['Id','Title', 'Author', 'Pages', 'Read'];
var fLength=fields.length;
var length=0;
var temp = "hi";

function book(id,title, author, pages, read){
    this.id=id;
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
}


book.prototype.log = function(){
    return (this.title+" was written by "+this.author+" and has "+this.pages+" pages."+this.read)
}

function render(){
    var aLength = myLibrary.length;
    for (let i=0; i<aLength ; i++){
        inRender(myLibrary[i],i);
    }
}

function inRender(newLine,L){
    $('#data_table').append($('<tr id='+myLibrary[L]["id"]+'><td>'+myLibrary[L]['id']+'</td><td>'+myLibrary[L]['title']+'</td><td>'+myLibrary[L]['author']+'</td><td>'+myLibrary[L]['pages']+'</td><td>'+myLibrary[L]['read']+'</td></tr>', {id : myLibrary[L].id, 'class' : 'table mx-0 my-0'}))




}


$(document).on('click', '#headers', function(){
    render();
});
$(document).on('click', '#headers', function(){
    render();
});
$(document).on('click', '#input_submit', function(){
    var readCheck = $("#input_Read").is(":checked");
    if (readCheck){
        var checked = 'Read';
    }
    else{
        var checked = 'Not Read';
    }
    var stuff = new book(document.getElementById('input_Id').value,document.getElementById('input_Title').value,document.getElementById('input_Author').value,document.getElementById('input_Pages').value,checked);

    myLibrary.push(stuff);
    inRender(stuff, myLibrary.length - 1);
});

window.onload = function() {
    for (var inp = 0; inp <fields.length; inp++){
        if (fields[inp]=='Read'){
        $('#input_fields').append($("<td><input type='checkbox' placeholder="+fields[inp]+" id=input_"+fields[inp]+" value='Not Read' checked='Read'>Read</td>", {id : 'input_'+fields[inp], 'class' : 'table mx-0 my-0'}))
        }
        else
        {
            $('#input_fields').append($("<td><input type='text' placeholder="+fields[inp]+" id=input_"+fields[inp]+"></td>", {id : 'input_'+fields[inp], 'class' : 'table mx-0 my-0'}))
        }
    }
    fields.forEach( function(field){
        $('#headers').append($('<th><h3>'+field+'</h3></th>', {id : field, 'class' : 'table mx-0 my-0'}))
    });

    var example = new book("000","WoT","jordan","600","Yes");
    var example2 = new book("001","WoG","Bordan","700","No");

    myLibrary.push(example);
    myLibrary.push(example2);
};