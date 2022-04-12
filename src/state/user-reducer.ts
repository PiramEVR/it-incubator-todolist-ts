type StateType = {
    age: number
    childrenCount: number
    name: string
}

type ActionType = {
    type: string
    [key: string]: any
}

export const userReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            state.age = state.age + 1;
            return state;
        case 'INCREMENT-CHILDREN-COUNT':
            state.childrenCount = state.childrenCount + 1;
            return state;
        case 'CHANGE-NAME':
            state.name = action.newName;
            return state;
        default:
            throw new Error("I don't understand this type")
    }
}

let nums = [1,2,3,4]
export function sum(...nums: Array<any>): number {
    console.log(nums)
    // ...здесь пишем код.

    // В return стоит "заглушка", чтоб typescript не ругался
    return 123
}

console.log(sum(nums))