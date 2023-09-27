from django.contrib import admin
#to make isTeacher visible in admin panel
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin
from django.contrib.auth.models import User
from .models import UserProfile
from .models import Course, Order, OrderItem, Billing, Video

class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'UserProfile'

class UserAdmin(DefaultUserAdmin):
    inlines = (UserProfileInline, )


# Register your models here.
admin.site.register(Course)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Billing)
admin.site.register(Video)
admin.site.unregister(User)
admin.site.register(User, UserAdmin)

