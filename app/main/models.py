from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    role = models.CharField(max_length=20)
    profile_image_path = models.FilePathField()

    class Meta:
        db_table = 'User'
    