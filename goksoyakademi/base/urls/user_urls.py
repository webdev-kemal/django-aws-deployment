from django.contrib import admin
from django.urls import path, include
from base.views import user_views as views

urlpatterns = [
    path('login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile', views.getUserProfile, name='users_profile'),
    path('profile/update/', views.updateUserProfile, name='users_profile_update'),
    path('register', views.registerUser, name='user_register'),
    path('verify/token', views.verify_token, name='user_validate'),
    path('verify/teacher', views.check_is_teacher, name='is_user_teacher'),
    path('', views.getUsers, name='users'),
]

