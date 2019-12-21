from django import forms
from .models import createdRankings

class RankForm (forms.ModelForm):
    
    
    class Meta:
        model = createdRankings
        fields =['title','subtitle']
