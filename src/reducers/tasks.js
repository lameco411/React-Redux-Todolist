import * as types from './../constants/ActionTypes';
import randomstring from 'randomstring';
import { findIndex} from 'lodash';
var data = JSON.parse(localStorage.getItem('tasks'));
var innitialState = data ? data : [];
var index = -1;
var myReducer = (state = innitialState, action) => {
    switch (action.type) {
        case types.DELETE_TASK:
            index = findIndex(state, (task) => task.id === action.id)
            state.splice(index, 1)
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.UPDATE_STATUS_TASK:
            index = findIndex(state, (task) => task.id === action.id)
            state[index] = {
                ...state[index], status: !state[index].status
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.SAVE_TASK:
            console.log('save task:',action.task)
            var task={
                id:action.task.id,
                name:action.task.name,
                status:action.task.status==='true'?true:false
            }
            if (!task.id) {                
                task.id=randomstring.generate(16);                   
                state.push(task);
            } else {
                index = findIndex(state, (t) => t.id === task.id)                
                 state[index]=task;
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.LIST_ALL:
            return state;
        default: return state;
    }
}
export default myReducer;