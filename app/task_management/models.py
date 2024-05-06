from django.db import models
from main.models import User

class Task(models.Model):
    name = models.CharField(max_length=255, unique=False)
    description = models.TextField()
    date_start = models.DateTimeField(null = True)
    date_end = models.DateTimeField(null = True)

    #внешний ключ Пользователь-Задачи
    user = models.ForeignKey(User, on_delete= models.CASCADE)


    class Meta:
        db_table = 'Task'

class Document(models.Model):
    name = models.CharField(max_length=255, unique=False)
    doc = models.FilePathField()

    #многие ко многим Задача-Документ
    tasks = models.ManyToManyField(Task)

    class Meta:
        db_table = 'Document'