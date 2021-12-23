import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS/TS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ])
    let [filter, setFilter] = useState<FilterValuesType>('all')



    function addTask(title: string) {
        let task = {id: v1(), title, isDone: false}
        let newTasks = [task, ...tasks];
        setTasks(newTasks)
    }



    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    let tasksForTodoList = tasks;
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t=>t.id === taskId);
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }


    const todoListTitle: string = "What to learn"


    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                filter={filter}
            />
        </div>
    )
}

export default App;
