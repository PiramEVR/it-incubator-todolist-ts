import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/ authReducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type NullableType<T> = null | T;

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as NullableType<string>,
    isInitialized: false,
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status
    } as const
}

export const setAppErrorAC = (error: NullableType<string>) => {
    return {
        type: 'APP/SET-ERROR',
        error
    } as const
}
export const setIsInitializedAC = (isInitialized: boolean) => {
    return {
        type: 'APP/SET-IS-INITIALIZED',
        isInitialized
    } as const
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {

            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
        .finally(() => {
            dispatch(setIsInitializedAC(true))
        })
}


export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type setIsInitializedActionType = ReturnType<typeof setIsInitializedAC>

type ActionsType = SetAppStatusActionType | SetAppErrorActionType | setIsInitializedActionType