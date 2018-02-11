import { createStore, applyMiddleware } from 'redux';
import Storage from 'redux-state-save';
import { rootReducer } from './rootReducer';
import path = require('path');

const storage = new Storage();
storage.setConfig({
    storage_type: 'file_storage',
    file_path: path.join(__dirname, '../../'),
    file_name: 'storage.json',
});

let store = createStore(
    rootReducer, 
    applyMiddleware(
        storage.saveState()
    )
);

store = storage.loadState(store);

store.dispatch({
    type: 'NULL',
});

export const db = store;