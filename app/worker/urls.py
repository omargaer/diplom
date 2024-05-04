#маршрутизация приложения worker

from django.urls import path
from worker import views

app_name = 'worker'

urlpatterns = [
    path('', views.work, name = 'work') #базовая страница работника (окно задач)
]
