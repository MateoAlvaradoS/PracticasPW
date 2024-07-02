from rest_framework import serializers
from .models import Task, Person
class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    persona = serializers.PrimaryKeyRelatedField(queryset=Person.objects.all())

class Meta:
    model = Task
    fields = '__all__'