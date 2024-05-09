import json
from django.shortcuts import render
from task_management import models
from django.core import serializers
from .models import Task

#enter group
def authorization(request):
    return render(request, "task_management/enter_templates/auth.html")

def registration(request):
    return render(request, "task_management/enter_templates/reg.html")

# def kanban_board(request):
#     return render(request, 'kanban_board.html', {'tasks': tasks})

#worker group
def worker_tasks(request):
    # x = models.User.objects.all()
    # context = {
    #     'currentuser': x[0].username
    # } return context надо 
    backlog_tasks = Task.objects.filter(status='backlog')
    progress_tasks = Task.objects.filter(status='progress')
    complete_tasks = Task.objects.filter(status='complete')
    on_hold_tasks = Task.objects.filter(status='on_hold')

    # Сериализация данных
    tasks = {
        'backlog': json.dumps([task.name for task in backlog_tasks]),
        'progress': json.dumps([task.name for task in progress_tasks]),
        'complete': json.dumps([task.name for task in complete_tasks]),
        'onHold': json.dumps([task.name for task in on_hold_tasks])
    }
    return render(request, "task_management/worker_templates/worker_kanban.html", {'tasks': tasks})

def worker_stat(request):
    return render(request, "task_management/worker_templates/worker_stat.html")

def worker_gantt(request):
    return render(request, "task_management/worker_templates/worker_gantt.html")


#director group

def director_stat(request):
    return render(request, "task_management/director_templates/director_stat.html") 