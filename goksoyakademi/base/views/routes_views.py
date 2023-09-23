from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def getRoutes(request):
    routes=[

        'api/videos/',
        'api/video/create',
        'api/video/<id>',
        'api/courses/',
        'api/course/create',
        'api/course/<id>'

    ]
    # return JsonResponse('hello', safe=False)
    return Response(routes)
