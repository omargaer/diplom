#маршрутизация приложения main

from django.urls import path
from main import views

app_name = 'main'

urlpatterns = [
    path('', views.index, name = 'index'),
    path('registration/', views.registration, name = 'registration')
]
