const app = new Vue({
    delimiters: ["[[", "]]"],
    el: "#todos",
    data: {
        todos: [],
        newTodo: "",
        errorMessage: false,
        editingText: "",
        posts: null
    },
    methods: {
        addNewTodo: function () {
            if (this.newTodo === "") {
                this.errorMessage = true;
            } else {
                axios.post(todos_url, {name: this.newTodo})
                    .then(response => {
                        this.todos.push(response.data)
                    });
                // this.todos.push({name: this.newTodo, id: this.newTodo.length, editing: false});
                this.newTodo = "";
                this.errorMessage = false;
            }

        },
        completeTodo: function (id) {
            const todo = this.todos.filter(todo => todo.id === id)[0];
            axios.patch(`api/todos/${todo.id}`, {completed: true})
                .then(response => {
                    this.todos.forEach(todo => {
                        if (todo.id === response.data.id) {
                            todo.completed = response.data.completed
                        }
                    })
                })

        },
        addToNotComplete: function (id) {
            const todo = this.completed.filter(todo => todo.id === id)[0];
            axios.patch(`api/todos/${todo.id}`, {completed: false})
                .then(response => {

                    this.todos.forEach(todo => {
                        if (todo.id === response.data.id) {
                            todo.completed = response.data.completed
                        }
                    })
                })

        },
        completeEdit: function (id) {
            const todo = this.todos.filter(todo => todo.id === id)[0];
            axios.patch(`api/todos/${todo.id}`, {name: this.editingText})
                .then(response => {
                    this.todos.forEach(todo => {
                        if (todo.id === response.data.id) {
                            todo.name = response.data.name;
                            todo.editing = false;
                        }
                    })
                });

            this.editingText = "";
        }
    },
    computed: {
        renderableTodos: function () {
            return this.todos.filter(todo => todo.editing === false);
        },
        notCompleted: function () {
            return this.todos.filter(todo => todo.completed === false)
        },
        completed: function () {
            return this.todos.filter(todo => todo.completed === true)
        }
    },
    mounted: function () {
        axios.get(todos_url)
            .then(response => {
                this.todos = response.data
            })
    }
});