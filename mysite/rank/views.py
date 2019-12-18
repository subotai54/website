from django.http import HttpResponse
from django.views import generic
from .models import list
from django.shortcuts import render, get_object_or_404

class ListList(generic.ListView):
    queryset = list.objects.order_by('-created_on')
    template_name = 'rank/index.html'


def list_detail(request, slug):
    template_name = 'rank/list_detail.html'
    List = get_object_or_404(list, slug=slug)
    films = List.film.all()


    return render(request, template_name, {'List': List,
                                           'films': films})