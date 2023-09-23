from django.shortcuts import render
# from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.videos import A1Videos
from ..courses import Courses

# models
from ..models import Course
# serializer
from ..serializer import CourseSerializer



# Create your views here.


@api_view(['GET'])
def getRoutes(request):
    routes=[

        'api/videos/',
        'api/video/create',
        'api/video/<id>',
        'api/courses/home',
        'api/course/create',
        'api/course/<id>'

    ]
    # return JsonResponse('hello', safe=False)
    return Response(routes)

@api_view(['GET'])
def getVideos(request):
    return Response(A1Videos)

# Serializerllar, adminden yaratılan Course objelerini hangi fieldlerin gösterileceğini belirleyip json formatına çeviriyor, burada view ediyor
@api_view(['GET'])
def getCourses(request):
    courses = Course.objects.all()
    serializer = CourseSerializer(courses, many=True)
    # return Response(Courses)
    return Response(serializer.data)

# @api_view(['GET'])
# def getCourse(request, pk):
#     Course:None
#     for i in Courses:
#         if i['_id'] == pk:
#             Course = i
#             break
#     return Response(Course)

@api_view(['GET'])
def getCourse(request, pk):
    course = Course.objects.get(_id=pk)
    serializer = CourseSerializer(course, many=False)
    return Response(serializer.data)