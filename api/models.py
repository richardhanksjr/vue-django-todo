from django.db import models


class Todo(models.Model):
    name = models.CharField(max_length=100, default="N/A")
    editing = models.BooleanField(default=False)
    completed = models.BooleanField(default=False)