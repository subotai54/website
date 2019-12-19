from django.views import generic
from .models import list
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.exceptions import PermissionDenied
from django.contrib import messages


class ListList(LoginRequiredMixin, generic.ListView):
    template_name = 'rank/index.html'
    def get_queryset(self):
        return list.objects.filter(author=self.request.user).order_by('-created_on')

@login_required
def list_detail(request,author, slug):
    List = get_object_or_404(list, slug=slug)

    if List.author == request.user:

        template_name = 'rank/list_detail.html'
        films = List.film.all()


        return render(request, template_name, {'List': List,
                                               'films': films})
    else:
        raise PermissionDenied("This list does not belong to you.")
