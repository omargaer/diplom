# маршрутизация главной страницы
from django.urls import path
from task_management import views

app_name = "task_management"
urlpatterns = [
    path("", views.authorization, name="authorization"),
    path("registration/", views.registration, name="registration"),
    path("workertasks/", views.worker_tasks, name="worker_tasks"),
    path("workerstat/", views.worker_stat, name="worker_statistics"),
    path("workergantt/", views.worker_gantt, name="worker_gantt"),
    path("directorstat/", views.director_stat, name="director_statistics"),
    path("manageworkers/", views.workers_table, name = "manageworkers"),
    path("logout/", views.logout, name="logout")]
