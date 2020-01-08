function book(title, author, pages, read){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
}

book.prototype.log = function(){
    return (this.title+" was written by "+this.author+" and has "+this.pages+" pages."+this.read)
}

var example = new book("WoT","jordan","600","This has been read.")

$(document).on('click', '#display', function(){
    $('#display').text(example.log())
});