import * as types from '../constants/ActionTypes';
var innitialState = {
    by: 'name', value: 1}
var myReducer = (state = innitialState, action) => {
    switch (action.type) {
        case types.SORT_TASK:
            console.log("reducers:",action.sorts)
           return action.sorts
        default: return state;
    }
}
export default myReducer;