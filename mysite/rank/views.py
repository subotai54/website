from django.http import HttpResponse
from django.shortcuts import render
from rank.models import Book, Author, BookInstance, Genre
from django.views import generic

class BookListView(generic.ListView):
    model = Book
 # Get 5 books containing the title war
    paginate_by = 3

class BookDetailView(generic.DetailView):
    model = Book
    paginate_by = 1

def index(request):

    # Generate counts of some of the main objects
    num_books = Book.objects.all().count()
    num_instances = BookInstance.objects.all().count()

    # Available books (status = 'a')
    num_instances_available = BookInstance.objects.filter(status__exact='a').count()

    # The 'all()' is implied by default.
    num_authors = Author.objects.count()

    num_a = Book.objects.filter(title__icontains='a').count()

    num_g = Genre.objects.filter(name__icontains='d').count()

    context = {
        'num_books': num_books,
        'num_instances': num_instances,
        'num_instances_available': num_instances_available,
        'num_authors': num_authors,
        'num_a': num_a,
        'num_g': num_g,
    }

    # Render the HTML template index.html with the data in the context variable
    return render(request, 'rank/index.html', context=context)