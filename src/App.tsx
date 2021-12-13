import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS/TS", isDone: false},])
    let [filter, setFilter] = useState<FilterValuesType>('all')


    function removeTask(id: number) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    let tasksForTodoList = tasks;
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }


    const todoListTitle: string = "What to learn"


    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    )
}

export default App;
