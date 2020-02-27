import { call, put, all, takeLatest } from 'redux-saga/effects';
import { testRedux } from '../actions';
import {BATATAS, TEST} from "../actions/types/types";


const INITIAL_STATE = {
    test: "test"
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TEST:
            return { ...state, test: action.payload };
        case BATATAS:
            return { ...state, batatas: action.payload };
        default:
            return state;
    }
    // takeLatest(TEST, testRedux);
}
