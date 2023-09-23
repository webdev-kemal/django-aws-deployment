from django.contrib import admin
from django.urls import path, include
from base.views import user_views as views

urlpatterns = [
    path('login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile', views.getUserProfile, name='users_profile'),
    path('profile/update/', views.updateUserProfile, name='users_profile_update'),
    path('register', views.registerUser, name='user_register'),
    path('', views.getUsers, name='users'),
]

