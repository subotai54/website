from django.views import generic
from .models import createdRankings, film
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.exceptions import PermissionDenied
from django.contrib import messages
from .forms import RankForm, FilmForm
from django.utils import timezone
from django.template.defaultfilters import slugify
from django.db import models
from django.db import IntegrityError
from django.db.models import Max


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
    try:
        List = get_object_or_404(createdRankings, slug=slug)
        form = FilmForm()
        if List.author == request.user:

            template_name = 'rank/list_detail.html'
            films = List.film.all()
            if request.method == "POST":
                form = FilmForm(request.POST)
            if form.is_valid():
                newFilm = form.save(commit=False)
                newFilm.author = request.user
                newFilm.created_on = timezone.now()
                newFilm.parentRanking= List
                highest = films.aggregate(Max('rank'))
                max_int = int(highest['rank__max'])
                if max_int == newFilm.rank-1:
                    newFilm.save()
                else:
                    return render(request, 'rank/list_detail.html', {'form': form,'List': List,'films': films,"message": str(max_int)+str(newFilm.rank)})


                return redirect('list_detail',author=request.user, slug=slug)

            return render(request, 'rank/list_detail.html', {'form': form,'List': List,'films': films})

        else:
            raise PermissionDenied("This list does not belong to you.")
    except IntegrityError as e:
            return render(request, 'rank/list_detail.html', {'form': form,'List': List,'films': films,"message": "Rank or film already exists"})


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
