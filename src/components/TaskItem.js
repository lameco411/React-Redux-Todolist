import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
class TaskItem extends Component {
    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }
    onDeleteItem = () => {
        this.props.onDeleteItem(this.props.task.id);
        this.props.onCloseForm();
    }
    onSelectedItem = () => {        
        this.props.onOpenForm();
        this.props.onSelectedItem(this.props.task);
    }
    render() {
        var { index, task } = this.props
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span
                        className={task.status ? "text-success" : "text-danger"}
                        onClick={this.onUpdateStatus}
                    >
                        {task.status ? "Kích hoạt" : "Ẩn"}
                    </span>
                </td>
                <td className="text-center d-flex justify-content-center">
                    <button onClick={this.onSelectedItem} className="btn btn-warning mr-3" type="button">
                        <span className="fs fa-pencil mr-1"></span>Sửa
                    </button>
                    <button onClick={this.onDeleteItem} className="btn btn-danger" type="button">
                        <span className="fa fa-trash mr-1"></span>Xóa
                    </button>
                </td>
            </tr>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isDisplayForm: state.isDisplayForm
    };
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus: (id) => {
            dispatch(actions.updateStatusTask(id))
        },
        onDeleteItem: (id) => {
            dispatch(actions.deleteTask(id))
        },
        onCloseForm: () => {
            dispatch(actions.closeForm())
        },
        onOpenForm: () => {
            dispatch(actions.openForm())
        },
        onSelectedItem: (task) => {
            dispatch(actions.selectedTask(task))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);