from django.shortcuts import render
from ..forms import MyForm

def demoform(request):
    form=MyForm(request.POST, request.FILES)
    if request.method=="POST":
        if form.is_valid():
            form.save()
    return render(request, "demoform.html", {"form":form})
