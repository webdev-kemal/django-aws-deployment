# from django.contrib import admin
# from django.url import path, include

# urlpatterns = [

#     path('admin/', admin.site.urls),
#     path('api/', include('api.urls')),
#     path('', include('frontend.urls'))

# ]

from django.urls import path
from .views import index

urlpatterns = [
    path('', index)
]