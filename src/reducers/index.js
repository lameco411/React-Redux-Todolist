import { combineReducers } from "redux";
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';
 import itemEditing from './itemEditing';
 import filterTask from './filterTask';
 import keyword from './keyword';
 import sorts from './sorts';
const myReducer= combineReducers({
tasks,
isDisplayForm,
itemEditing,
filterTask,
keyword,
sorts
});
export default myReducer;