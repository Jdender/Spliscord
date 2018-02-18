import { createStore } from 'redux';
import { rootReducer } from './rootReducer';

let store = createStore(
    rootReducer 
);

store.dispatch({
    type: 'NULL',
});

export const cache = store;