import json
from django.test import TestCase
from django.urls import reverse

from rest_framework.test import APIClient, APIRequestFactory

from .models import Todo


class TestGetAllTodos(TestCase):
    def setUp(self):
        todo1 = Todo.objects.create(name="todo 1")
        todo2 = Todo.objects.create(name="todo 2")
        self.client = APIClient()

    def test_all_todos(self):
        response = self.client.get(reverse("todos"))
        todos = json.loads(response.content)
        self.assertEqual(len(todos), Todo.objects.all().count())


class TestCreateTodo(TestCase):

    def test_create_new_todo(self):
        # Sanity check
        num_todos_before = Todo.objects.all().count()
        self.assertEqual(0, num_todos_before)
        data = {"name": "new todo1"}
        response = self.client.post(reverse("todos"), data)
        content = json.loads(response.content)
        self.assertEqual(content['name'], data['name'])


class TestUpdateTodo(TestCase):

    def setUp(self):
        self.todo = Todo.objects.create(name="todo")
        self.client = APIClient()
        self.factory = APIRequestFactory()

    def test_update_todo(self):
        data = {'completed': True}
        url = reverse("update-todo", args=[self.todo.id])
        response = self.client.patch(url, data, format='json')
        content = json.loads(response.content)
        self.assertEqual(True, content['completed'])