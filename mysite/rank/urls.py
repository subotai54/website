from django.urls import path
from . import views

urlpatterns = [
    path('', views.ListList.as_view(), name='home'),
    path('new/', views.rank_new, name='rank_new'),
    path('<str:bad>/', views.bad_url, name='bad_url'),
    path('<author>/<slug:slug>/', views.list_detail, name='list_detail'),
    #path('/', views.list_detail, name='list_detail')

]