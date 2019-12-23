from django import forms
from .models import createdRankings, film

class RankForm (forms.ModelForm):
    class Meta:
        model = createdRankings
        fields =['title','subtitle']

class FilmForm (forms.ModelForm):
    class Meta:
        model = film
        fields =['name','rank']
