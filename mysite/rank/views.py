from django.views import generic
from .models import createdRankings
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.exceptions import PermissionDenied
from django.contrib import messages
from .forms import RankForm
from django.utils import timezone
from django.template.defaultfilters import slugify


class ListList(LoginRequiredMixin, generic.ListView):
    template_name = 'rank/index.html'

    def queryset(self):
        query=createdRankings.objects.filter(author=self.request.user).order_by('-created_on')
        return query

def bad_url(request,bad):
    error=bad+" in the url path is not an author."
    raise PermissionDenied(error)



@login_required
def list_detail(request,author, slug):
    List = get_object_or_404(createdRankings, slug=slug)

    if List.author == request.user:

        template_name = 'rank/list_detail.html'
        films = List.film.all()


        return render(request, template_name, {'List': List,
                                               'films': films})
    else:
        raise PermissionDenied("This list does not belong to you.")

def rank_new(request):
    form = RankForm()

    if request.method == "POST":
        form = RankForm(request.POST)
    if form.is_valid():
        rank = form.save(commit=False)
        rank.author = request.user
        rank.created_on = timezone.now()
        rank.slug = slugify(rank.title)

        rank.save()
        return redirect('list_detail',author=request.user, slug=rank.slug)


    return render(request, 'rank/rank_edit.html', {'form': form})
