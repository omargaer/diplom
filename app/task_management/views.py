from django.shortcuts import render

#enter group
def authorization(request):
    return render(request, "task_management/enter_templates/auth.html")

def registration(request):
    return render(request, "task_management/enter_templates/reg.html")


#worker group
def worker_tasks(request):
    return render(request, "task_management/worker_templates/worker_kanban.html")

def worker_stat(request):
    return render(request, "task_management/worker_templates/worker_stat.html")

#director group

def director_stat(request):
    return render(request, "task_management/director_templates/director_stat.html") 