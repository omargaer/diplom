# маршрутизация главной страницы

from django.urls import path
from task_management import views

app_name = "task_management"
urlpatterns = [
    path("", views.worker, name="worker")  # базовая страница работника (окно задач)
]
