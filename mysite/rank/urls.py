from django.urls import path
from . import views

urlpatterns = [
    path('', views.ListList.as_view(), name='home'),
    path('<slug:slug>/', views.list_detail, name='list_detail'),
    path('/', views.list_detail, name='list_detail')

]