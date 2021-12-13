import React from "react";
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    changeFilter: (value: FilterValuesType) => void

}

function TodoList(props: TodoListPropsType) {
    let tasksElements =    props.tasks.map((t) => <li key={t.id}><input type="checkbox" checked={t.isDone}/>
        <span>{t.title}</span>
        <button onClick={() => {
            props.removeTask(t.id)
        }}>x
        </button>
    </li>)

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {tasksElements }
                </ul>
                <div>
                    <button onClick={() => {
                        props.changeFilter('all')
                    }}>All
                    </button>
                    <button onClick={() => {
                        props.changeFilter('active')
                    }}>Active
                    </button>
                    <button onClick={() => {
                        props.changeFilter('completed')
                    }}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
}


export default TodoList;