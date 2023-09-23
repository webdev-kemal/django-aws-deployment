from django.contrib import admin
from django.urls import path, include
from base.views import courses_views as views

urlpatterns = [
    path('main', views.getCourses , name="courses"),
    path('main/<str:pk>', views.getCourse , name="course"),
    path('routes', views.getRoutes , name="routes"),
    path('videos/', views.getVideos , name="videos"),
]

