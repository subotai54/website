from . import views
from django.urls import path

urlpatterns = [
    path('', views.PostList.as_view(), name='blog_home'),
    path('<slug:slug>/', views.post_detail, name='post_detail'),
    path('/', views.post_detail, name='post_detail'),
    path('post/add/', views.PostCreate.as_view(), name='post-add'),
    path('<slug:slug>/edit/', views.PostUpdate.as_view(), name='post-update'),
    path('<slug:slug>/delete/', views.PostDelete.as_view(), name='post-delete'),

]