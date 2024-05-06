from django.shortcuts import render

def worker(request):
    return render(request, 'task_management/index.html' )
