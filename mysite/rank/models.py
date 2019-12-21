from django.urls import reverse # Used to generate URLs by reversing the URL patterns
from django.db import models
from django.conf import settings
from django.forms import ModelForm

class createdRankings(models.Model):
    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True)
    created_on = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    subtitle=models.CharField(max_length=200, unique=True)

    class Meta:
        ordering = ['-created_on']

    def __str__(self):
        return self.title


class film(models.Model):
    parentRanking = models.ForeignKey(createdRankings,on_delete=models.CASCADE,related_name='film')
    name = models.CharField(max_length=80)
    rank = models.IntegerField()

    class Meta:
        ordering = ['parentRanking','rank']
        constraints=[
            models.UniqueConstraint(fields=['parentRanking','rank'], name='unique_rank'),
            models.UniqueConstraint(fields=['parentRanking','name'], name='unique_film')
            ]

    def __str__(self):
        return '{} is in position {}'.format(self.name, self.rank)

