from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Course
from rest_framework_simplejwt.tokens import RefreshToken

class CourseSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()

    class Meta:
        model=Course
        fields='__all__'

    def get_author(self, obj):
        user = User.objects.get(id=obj.author.id)
        return f"{user.first_name} {user.last_name}"
        # return obj.author.username
    
class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ('name', 'id', '_id', 'isAdmin', 'email', 'first_name', 'last_name')

    def get_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ('name', 'id', '_id', 'isAdmin', 'email', 'first_name', 'last_name', 'token')

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)






