import React from 'react';
import CreateTodo from './create-todo';
import TodosList from './todo-list';

// This runs well on a webpack-dev-server.
// Intall all packages and run the webpack-dev-server
// localhost:8080
// Default todos to show
const todos = [
    {
        task: 'Win Worlds',
        isCompleted: false
    },
    {
        task: 'Destroy the world',
        isCompleted: true
    },
    {
        task: 'Learn react',
        isCompleted: false
    }

];

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos
        };
    }

    render() {
        return (
            <div>
                <h1>Lindstedts simple To-Do app</h1>
                <h2>Click an item to set it as completed or reset it as pending</h2>
                <CreateTodo todos={this.state.todos} createTask={this.createTask.bind(this)} />
                <TodosList
                    todos={this.state.todos}
                    toggleTask={this.toggleTask.bind(this)}
                    saveTask={this.saveTask.bind(this)}
                    deleteTask={this.deleteTask.bind(this)}
                />
            </div>
        );
    }
    // Change the bool value of the clicked entry.
    toggleTask(task) {
        const chosenTodo = _.find(this.state.todos, todo => todo.task === task);
        chosenTodo.isCompleted = !chosenTodo.isCompleted;
        this.setState({ todos: this.state.todos });
    }

    // Adds a new task to the list
    createTask(task) {
        this.state.todos.push({
            task,
            isCompleted: false
        });
        this.setState({ todos: this.state.todos });
    }

    // Saves the edited task
    saveTask(oldTask, newTask) {
        const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
        foundTodo.task = newTask;
        this.setState({ todos: this.state.todos });
    }

    // Remove chosen item
    deleteTask(taskToDelete) {
        _.remove(this.state.todos, todo => todo.task === taskToDelete);
        this.setState({ todos: this.state.todos });
    }
}