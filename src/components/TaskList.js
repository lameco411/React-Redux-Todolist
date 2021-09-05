import React, { Component } from 'react';
import TaskItem from './TaskItem';
import {connect} from 'react-redux';
import * as actions from './../actions/index';
class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1//tất cả -1, ẩn :0, kích hoạt 1
        }
    } 
    onChange=(event)=>{
        var target=event.target;
        var name = target.name
        var value = target.value        
        this.setState({
            [name]:value
        },()=>{
            this.props.onFilter({name:this.state.filterName,status:this.state.filterStatus});
        });
        
    }
    render() {        
        var {tasks,filter,keyword,sorts}=this.props;       
        if (filter) {
            if (filter.name) {
                //sử dụng js thuần
                 tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(filter.name) !== -1;
                }); 
                //sử dụng lodash
               /*  tasks = filter(tasks, (task) => {
                    return task.name.toLowerCase().indexOf(filter.name) !== -1;
                }); */
            }
            tasks = tasks.filter((task) => {
                if (filter.status === -1) {
                    return task;
                } else if (filter.status === 0) {
                    return task.status === false;
                } else {
                    return task.status === true
                }
            });
        }
        if (keyword) {
            tasks = tasks.filter((task) => task.name.toLowerCase().indexOf(keyword) !== -1)
        }
        if (sorts.by === 'name') {
            tasks.sort((a, b) => {
                if (a.name > b.name) return sorts.value;
                else if (a.name < b.name) return -sorts.value;
                else return 0
            });
        } else {
            tasks.sort((a, b) => {
                if (a.status > b.status) return -sorts.value;
                else if (a.status < b.status) return sorts.value;
                else return 0
            });
        }
        var elementTasks = tasks.map((task, index) => {
            return <TaskItem
                key={task.id}
                index={index}
                task={task}                 
            />
        })
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên</th>
                        <th>Trạng Thái</th>
                        <th>Hành động</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th>
                        <input
                         className="form-control" 
                         name="filterName" 
                         value={this.filterName} 
                        onChange={this.onChange}
                         /></th>
                        <th>
                        <select 
                        className="form-control"
                        name="filterStatus"
                        value={this.filterStatus}
                        onChange={this.onChange}
                        >
                            <option value={-1}>Tất cả</option>
                            <option value={0}>Ẩn</option>
                            <option value={1}>Hiện</option>
                        </select></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {elementTasks}
                </tbody>
            </table>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        filter:state.filterTask,
        keyword:state.keyword,
        sorts:state.sorts
       
    };
}
const mapDispatchToProps=(dispatch,props)=>{
    return {
        onFilter:(filter)=>{
            dispatch(actions.filterTask(filter))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (TaskList);