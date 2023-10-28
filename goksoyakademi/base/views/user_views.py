from django.shortcuts import render
# from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
# from .videos import A1Videos
# from .courses import Courses
from base.serializer import UserSerializer, UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import TokenError, AccessToken

from base.models import User

from rest_framework.permissions import IsAuthenticated, IsAdminUser
# bu dekoratör neden kullanılıyor??
from rest_framework.decorators import permission_classes

from django.contrib.auth.hashers import make_password
from django.views.decorators.csrf import csrf_exempt
# bu ne?
from rest_framework import status

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
     def validate(self, attrs):
        data = super().validate(attrs)

        # refresh = self.get_token(self.user)

        # data["refresh"] = str(refresh)
        # data["access"] = str(refresh.access_token)
        # data["username"] = self.user.username
        # data["email"] = self.user.email
        
        serializer = UserSerializerWithToken(self.user).data
        
        for k, v in serializer.items():
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    # print(request)
    # giriş yaptıysa artık with token getir
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    user.first_name=data['name']
    user.last_name = data['surname']  
    # user.username=data['email']
    # user.email=data['email']

    # if data['password'] != '':
    #     user.password = make_password(data['password'])
    user.save()

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

# @csrf_exempt
@api_view(['POST'])
def registerUser(request):
    print(request.data)
    data = request.data
    try: 
        user = User.objects.create(
            first_name = data['name'],
            username = data['email'],
            email = data['email'],
            password = make_password(data['password']),
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except Exception as e:
        # print(e)
        message = {
            # 'details' : 'Username veya Email kullanılıyor' 
            'details' : str(e)
        }
        return Response(message, status= status.HTTP_400_BAD_REQUEST)

    #jwt validation
@api_view(['POST'])
def verify_token(request):
    token = request.data.get('token')
    
    if not token:
        return Response({"valid": False}, status=400)
        
    try:
        AccessToken(token)
        return Response({"valid": True})
    except TokenError:
        return Response({"valid": False}, status=401)
    
# @api_view(['GET'])
# def some_protected_view(request):
#     if not request.user.userprofile.isTeacher:
#         return Response({"error": "Not allowed!"}, status=403)
    
# @api_view(['GET'])
# def check_is_teacher(request):
#     return Response({"isTeacher": request.user.userprofile.isTeacher})

@api_view(['GET'])
def check_is_teacher(request):
    # Assuming you want to allow even unauthenticated users to check
    # their teacher status. If the user isn't authenticated, return False.
    if not request.user.is_authenticated:
        return Response({"isTeacher": False})
    return Response({"isTeacher": request.user.userprofile.isTeacher})