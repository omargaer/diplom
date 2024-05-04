from django.shortcuts import render
from django.http import HttpResponse

def work(request):
    return render(request, 'worker/work.html' )
