import * as types from '../constants/ActionTypes';
var innitialState = {
    id: '', name: '', status: true
};
var myReducer = (state = innitialState, action) => {
    switch (action.type) {
        case types.CLEAR_FORM:
            state.id = "";
            state.name = "";
            state.status = true;
            //console.log('sau khi clear',state)
            return { ...state };
        case types.SELECTED_TASK:
            state.id = action.task.id;
            state.name = action.task.name;
            state.status = (typeof action.task.status === 'boolean')?action.task.status:action.task.status === 'false' ? false : true;
              
            //console.log('sau',state)
            return { ...state };
        default: return state;
    }
}
export default myReducer;