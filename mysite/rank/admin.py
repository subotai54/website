from django.contrib import admin
from .models import list
from .models import film


class listsAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug','created_on')
    search_fields = ['title']
    prepopulated_fields = {'slug': ('title',)}



class filmsAdmin(admin.ModelAdmin):
    list_display = ('name', 'rank', 'list')



admin.site.register(list, listsAdmin)
admin.site.register(film, filmsAdmin)
