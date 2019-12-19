from django.urls import path
from . import views

urlpatterns = [
    path('', views.ListList.as_view(), name='home'),
    path('<author>/<slug:slug>/', views.list_detail, name='list_detail'),
    path('<slug:slug>/', views.list_detail, name='list_detail'),
    path('/', views.list_detail, name='list_detail')

]