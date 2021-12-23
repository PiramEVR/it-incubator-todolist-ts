import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (id: string) => void
    addTask: (title: string) => void
    changeFilter: (value: FilterValuesType) => void
    changeStatus: (taskId: string, isDone: boolean) => void

}

function TodoList(props: TodoListPropsType) {
    const tasksElements = props.tasks.map((t) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement> ) => {
        props.changeStatus(t.id, e.currentTarget.checked)
        }

       return <li className={t.isDone ? 'is-done' : ''} key={t.id}><input
            type="checkbox"
            checked={t.isDone}
            onChange={onChangeHandler}
       />
            <span>{t.title}</span>
            <button onClick={() => {
                props.removeTask(t.id)
            }}>x
            </button>
        </li>
    })

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if(title.trim() !== ''){
            props.addTask(title.trim())
            setTitle('')
        } else {
           setError('Field is required')
        }

    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTask()
        }
    }
    const onClickChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onClickSetAllFilter = () => {
        props.changeFilter('all')
    }
    const onClickSetActiveFilter = () => {
        props.changeFilter('active')
    }
    const onClickSetCompletedFilter = () => {
        props.changeFilter('completed')
    }

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={title}
                           onChange={onClickChangeTitle}
                           onKeyPress={onKeyPressAddTask}
                           className={error ? 'error' : ''}
                    />
                    <button onClick={addTask}>+
                    </button>
                    {error && <div className={'error-message'}>{error}</div>}
                </div>
                <ul>
                    {tasksElements}
                </ul>
                <div>
                    <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onClickSetAllFilter}>All
                    </button>
                    <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onClickSetActiveFilter}>Active
                    </button>
                    <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onClickSetCompletedFilter}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
}


export default TodoList;