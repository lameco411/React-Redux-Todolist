import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: "",
            status: true
        }
    }
    componentWillMount() {        
        var { itemEditing } = this.props;       
        if (itemEditing && itemEditing.id !== null) {
            this.setState({
                id: itemEditing.id,
                name: itemEditing.name,
                status: itemEditing.status
            }, () => {
                //console.log("set state ban dau:", this.state)
            })
        }
    }
    componentWillReceiveProps(nextProps) {     
        console.log(nextProps)   
        if (nextProps && nextProps.itemEditing) {
            this.setState({
                id: nextProps.itemEditing.id,
                name: nextProps.itemEditing.name,
                status: nextProps.itemEditing.status,
            }, () => {
                console.log("set state tiep theo:", this.state)
            })
        } else if (nextProps && nextProps.itemEditing === null) {
            this.setState({
                id: '', name: '', status: true
            })
        }
    }
    onClose = () => {
        this.props.onCloseForm();
    }
    onChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        });
    }
    onSubmit = (event) => {
        event.preventDefault();
        //console.log(this.state)      
        this.props.onSaveTask(this.state);//hàm mới gọi lên store

        this.onClose();
        this.setState({
            id: '', name: '', status: true
        })
    }
    onClear = (event) => {
        event.preventDefault();
        this.setState({
            id: '', name: '', status: true
        })
    }

    render() {
        let { isDisplayForm } = this.props;
        let { id } = this.state;
        if (isDisplayForm) {
            return (
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <form onSubmit={this.onSubmit}>
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title d-flex">
                                    {id!=='' ? 'Cập nhật công việc' : 'Thêm công việc'}
                                    <span onClick={this.onClose} className="ml-auto">
                                        <i className="fa fa-times-circle"></i>
                                    </span>
                                </h3>
                            </div>
                            <div className="card-body">

                                <div className="form-group">
                                    <label>Tên:</label>
                                    <input
                                        onChange={this.onChange}
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={this.state.name} />
                                </div>
                                <div className="form-group">
                                    <label>Trạng thái:</label>
                                    <select
                                        onChange={this.onChange}
                                        type="text"
                                        className="form-control"
                                        name="status"
                                        value={this.state.status}>
                                        <option value={true}>Kích hoạt</option>
                                        <option value={false}>Vô hiệu</option>
                                    </select>
                                </div>
                            </div>
                            <div className="card-footer text-muted form-inline">
                                <div className="form-group">
                                    <button onClick={this.onSubmit} type="submit" className="btn btn-warning mr-5">
                                        <span className="fa fa-plus mr-1"></span>
                                        Lưu
                                    </button> <br />
                                    <button onClick={this.onClear} type="submit" className="btn btn-danger">
                                        <span className="fa fa-close mr-1"></span>
                                        Hủy
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            );
        } else {
            return false;
        }
    }
}
const mapStateToProps = (state) => {
    return {
        isDisplayForm: state.isDisplayForm,
        itemEditing: state.itemEditing
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveTask: (task) => {
            dispatch(actions.saveTask(task))
        },
        onCloseForm: () => {
            dispatch(actions.closeForm())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
