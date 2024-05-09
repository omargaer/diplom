import os
from random import randint
import django
from django.utils.timezone import now
from task_management import models
from faker import Faker

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')
django.setup()

fake = Faker()

user, created = models.User.objects.get_or_create(
    id=1,
    defaults={'username': 'test_user', 'email': 'test@example.com', 'password': 'safe_password'}
)

for _ in range(20):
    models.Task.objects.create(
        name=fake.sentence(nb_words=6),
        description=fake.text(),
        date_start=now() - django.utils.timezone.timedelta(days=randint(1, 30)),
        date_end=now() + django.utils.timezone.timedelta(days=randint(1, 30)),
        user=user
    )
