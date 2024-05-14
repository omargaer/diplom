from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    role = models.CharField(max_length=20, default="worker")
    
    class Meta:
        db_table = 'User'

    def __str__(self) -> str:
        return self.name
    
class Task(models.Model):
    name = models.CharField(max_length=255, unique=False)
    description = models.TextField()
    date_start = models.DateTimeField(null = True)
    date_end = models.DateTimeField(null = True)
    status = models.TextField()
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
        