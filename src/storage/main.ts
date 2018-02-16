import { createStore, applyMiddleware } from 'redux';
import Storage from 'redux-state-save';
import { rootReducer } from './rootReducer';
import path = require('path');

const fileStorage = new Storage();
fileStorage.setConfig({
    storage_type: 'file_storage',
    file_path: path.join(__dirname, '../../'),
    file_name: 'storage.json',
});

let store = createStore(
    rootReducer, 
    applyMiddleware(
        fileStorage.saveState()
    )
);

store = fileStorage.loadState(store);

store.dispatch({
    type: 'NULL',
});

export const storage = store;