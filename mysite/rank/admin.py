from django.contrib import admin
from .models import createdRankings
from .models import film


class listsAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug','created_on','author','subtitle')
    search_fields = ['title']
    prepopulated_fields = {'slug': ('title',)}



class filmsAdmin(admin.ModelAdmin):
    list_display = ('name', 'rank', 'parentRanking')



admin.site.register(createdRankings, listsAdmin)
admin.site.register(film, filmsAdmin)
