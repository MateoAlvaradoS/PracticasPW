from rest_framework import viewsets
from .serializer import TaskSerializer, PersonSerializer
from .models import Task, Person
class PersonView(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()