import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

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

const persistConfig = {
    key: 'root',
    storage: storage,
};


const persistedReducer  = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
