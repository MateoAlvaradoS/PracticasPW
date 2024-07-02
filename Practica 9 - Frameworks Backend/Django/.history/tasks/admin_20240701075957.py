from django.contrib import admin
from .models import Task, Person

admin.site.register(Person)
admin.site.register(Task)