from django.db import models

# Create your models here.
class Person(models.Model):
    name = models.CharField(max_length=200)
    address = models.TextField(blank=True)
    phone = models.CharField(max_length=15)
    def __str__(self):
        return self.name

class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    done = models.BooleanField(default=False)
    persona = models.ForeignKey(Persona, on_delete=models.CASCADE, related_name=
                                'tasks', null=True, blank=True)
    def __str__(self):
        return self.title