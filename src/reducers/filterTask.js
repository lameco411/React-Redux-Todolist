import * as types from '../constants/ActionTypes';
var innitialState = {
   name: '', status: -1
};
var myReducer = (state = innitialState, action) => {
    switch (action.type) {
        case types.FILTER_TASK:
            //console.log('action task: ',action.filter)
            action.filter.status=parseInt(action.filter.status)
            return action.filter;
        default: return state;
    }
}
export default myReducer;