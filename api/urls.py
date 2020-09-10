from django.urls import path
from .import views

urlpatterns = [
    path('todos', views.TodoListCreate.as_view(), name="todos"),
    path('todos/<int:pk>', views.UpdateTodo.as_view(), name="update-todo")
]