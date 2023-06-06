import { createStore } from 'redux'

const initialState = { token: null, user: null } //Estado inicial

const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'setToken':
            return { ...state, token: action.payload }
        case 'nullToken':
            return { ...state, token: null }
        case 'setUser':
            return { ...state, user: action.payload }
        case 'nullUser':
            return { ...state, user: null }
        case 'logout':
            return { ...state, user: null, token: null }
        default:
            return state
    }
}

// Store
const store = createStore(rootReducer);

export default store