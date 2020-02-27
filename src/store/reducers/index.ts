import { combineReducers } from 'redux';
import TestReducer from "./test.reducer";

export default function createReducer(injectedReducers = {}) {
    const rootReducer = combineReducers({
        test: TestReducer,
        ...injectedReducers
    });

    return rootReducer;
}
