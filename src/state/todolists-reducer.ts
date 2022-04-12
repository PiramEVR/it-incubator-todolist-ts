import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state].filter(f => f.id !== action.payload.id)
        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.payload.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return [...state].map(m=> m.id === action.payload.id? {...m,title:action.payload.title}:m)
        case 'CHANGE-TODOLIST-FILTER':
            return [...state].map(m => m.id === action.payload.id? {...m,filter:action.payload.filter}: m)
        default:
            return state
    }
}

type ActionType = removeTodolistACType | addTodolistACType | changeTodolistTitleACType | changeTodolistFilterACType

type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type:'REMOVE-TODOLIST',
        payload:{
            id
        }
    } as const
}

type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type:'ADD-TODOLIST',
        payload:{
            title
        }
    } as const
}

type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (id:string, title: string) => {
    return {
        type:'CHANGE-TODOLIST-TITLE',
        payload:{
            id,
            title
        }
    } as const
}

type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (id:string, filter: FilterValuesType) => {
    return {
        type:'CHANGE-TODOLIST-FILTER',
        payload:{
            id,
            filter
        }
    } as const
}


