from django.urls import reverse # Used to generate URLs by reversing the URL patterns
from django.db import models

class list(models.Model):
    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True)
    created_on = models.DateTimeField(auto_now_add=True)


    class Meta:
        ordering = ['-created_on']

    def __str__(self):
        return self.title


class film(models.Model):
    list = models.ForeignKey(list,on_delete=models.CASCADE,related_name='film')
    name = models.CharField(max_length=80)
    rank = models.IntegerField()

    class Meta:
        ordering = ['list','rank']
        constraints=[
            models.UniqueConstraint(fields=['list','rank'], name='unique_rank')
            ]

    def __str__(self):
        return 'Comment {} by {}'.format(self.name, self.rank)