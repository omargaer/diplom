import json
from django.shortcuts import render
from django.contrib import auth, messages
from django.urls import reverse
from django.http import HttpResponseRedirect
from django.shortcuts import redirect
from task_management.forms import UserLoginForm, RegistrationForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth.decorators import user_passes_test
from .models import Task, User

#проверка на роль пользователя для ограничения доступа работника к страницам руководителя
def check_user_condition(user):
    return user.role == "director"

# enter group
def authorization(request):
    if request.method == "POST":
        form = UserLoginForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            auth.login(request, user)
            if user.role == "worker":
                return HttpResponseRedirect(reverse("task_management:worker_tasks"))
            else:
                return HttpResponseRedirect(reverse("task_management:manageworkers"))
            if "next" in request.POST and request.POST["next"]:
                return HttpResponseRedirect(request.POST["next"])
        else:
            # Если форма не валидна, добавляем сообщение об ошибке
            for field, errors in form.errors.items():
                for error in errors:
                    messages.add_message(request, messages.ERROR, error)
            return render(
                request, "task_management/enter_templates/auth.html", {"form": form}
            )
    else:
        form = UserLoginForm()
        return render(
            request, "task_management/enter_templates/auth.html", {"form": form}
        )
def registration(request):
    print(request.method == "POST")
    
    if request.method == "POST":
        form = RegistrationForm(data=request.POST)
        if form.is_valid():
            form.save()
            user = form.instance
            return redirect('task_management:manageworkers')
    else:
        form = RegistrationForm()
    return redirect('task_management:manageworkers')
def logout(request):
    auth.logout(request)
    return redirect(reverse('task_management:authorization'))

# worker group
@login_required
def worker_tasks(request):
    current_user = request.user.id  # Получение ID авторизованного пользователя
    # print(user_id)
    backlog_tasks = Task.objects.filter(status="backlog").filter(user_id=current_user)
    progress_tasks = Task.objects.filter(status="progress").filter(user_id=current_user)
    complete_tasks = Task.objects.filter(status="complete").filter(user_id=current_user)
    on_hold_tasks = Task.objects.filter(status="on_hold").filter(user_id=current_user)

    # Сериализация данных
    def format_datetime(dt):
        return dt.strftime("%Y-%m-%d %H:%M:%S") if dt else None

    # Сериализация данных
    tasks = {
        "backlog": json.dumps(
            [
                {
                    "id": task.id,
                    "name": task.name,
                    "description": task.description,
                    "date_start": format_datetime(task.date_start),
                    "date_end": format_datetime(task.date_end),
                    "status": task.status,
                }
                for task in backlog_tasks
            ]
        ),
        "progress": json.dumps(
            [
                {
                    "id": task.id,
                    "name": task.name,
                    "description": task.description,
                    "date_start": format_datetime(task.date_start),
                    "date_end": format_datetime(task.date_end),
                    "status": task.status,
                }
                for task in progress_tasks
            ]
        ),
        "complete": json.dumps(
            [
                {
                    "id": task.id,
                    "name": task.name,
                    "description": task.description,
                    "date_start": format_datetime(task.date_start),
                    "date_end": format_datetime(task.date_end),
                    "status": task.status,
                }
                for task in complete_tasks
            ]
        ),
        "onHold": json.dumps(
            [
                {
                    "id": task.id,
                    "name": task.name,
                    "description": task.description,
                    "date_start": format_datetime(task.date_start),
                    "date_end": format_datetime(task.date_end),
                    "status": task.status,
                }
                for task in on_hold_tasks
            ]
        ),
    }
    return render(
        request, "task_management/worker_templates/worker_kanban.html", {"tasks": tasks}
    )


@login_required
def worker_stat(request):
    return render(request, "task_management/worker_templates/worker_stat.html")


@login_required
def worker_gantt(request):
    return render(request, "task_management/worker_templates/worker_gantt.html")


# director group
@login_required
def director_stat(request):
    return render(request, "task_management/director_templates/director_stat.html")


@login_required
@user_passes_test(check_user_condition)
def workers_table(request):
    workers = User.objects.filter(role="worker")
    return render(request, "task_management/director_templates/director_workers_manage.html", {"workers": workers} )
