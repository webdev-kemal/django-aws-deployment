from django.contrib import admin

from .models import Course, Order, OrderItem, Billing, Video


# Register your models here.
admin.site.register(Course)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Billing)
admin.site.register(Video)
