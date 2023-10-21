from django.contrib import admin
from django.urls import path, include
from base.views import routes_views as views
from base.views import demo_views as demoviews

urlpatterns = [
    path('', views.getRoutes , name="routes"),
    path('demo/', demoviews.demoform , name="routes"),
    
]