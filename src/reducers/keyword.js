import * as types from '../constants/ActionTypes';
var innitialState="";
var myReducer=(state=innitialState,action)=>{
    switch(action.type){
        case types.SEARCH_TASK:  
            console.log(action.keyword)          
            return action.keyword
        default:return state;
    }    
}
export default myReducer;