"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.contrib.staticfiles.urls import staticfiles_urlpatterns



urlpatterns = [
    path('', include('frontend.urls')),
    path('admin/', admin.site.urls),
    path('routes', include("base.urls.routes_urls")),
    path('api/courses/', include("base.urls.courses_urls")),
    path('api/user/', include("base.urls.user_urls")),

    # static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
]


urlpatterns += staticfiles_urlpatterns()
urlpatterns+= static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += [re_path(r'^.*$', TemplateView.as_view(template_name='frontend/index.html'))]