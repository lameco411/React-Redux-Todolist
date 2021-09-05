import React, { Component } from 'react';
import TaskForm from './components/TaskForm';
import './App.css';
import Control from './components/Control';
import TaskList from './components/TaskList';
import { connect } from 'react-redux';
import * as actions from './actions/index';
class App extends Component {
    constructor(props) {
        super(props);       
    }
    componentWillMount() {
        if (localStorage && localStorage.getItem('tasks')) {
            this.setState({
                tasks: JSON.parse(localStorage.getItem('tasks'))
            })
        }
    }
    onToggleForm = () =>{
        if (this.props.itemEditing&&this.props.itemEditing.id!=='') {
            this.props.onOpenForm();
            this.props.onClearForm();
        }else{
             this.props.onToggleForm(); 
        }   
    }  
    render() {
        var {isDisplayForm}=this.props;            
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản lý công việc</h1>
                </div>
                <div className="row">
                <TaskForm/>
                    <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                        <button 
                        className="btn btn-primary" 
                        onClick={this.onToggleForm}>
                            <span className="fa fa-plus mr-1"></span>Thêm công việc
                        </button>
                        <Control
                            onSearch={this.onSearch}
                            onSort={this.onSort}
                        />
                        <div className="row mt-3">
                            <TaskList/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps=(state)=>{
    return{
        isDisplayForm:state.isDisplayForm,
        itemEditing:state.itemEditing
    }
}
const mapDispatchToProps =(dispatch,props)=>{
    return{
        onToggleForm:()=>{
            dispatch(actions.toggleForm())
        },
        onOpenForm: () => {
            dispatch(actions.openForm())
        },
        onClearForm:()=>{
            dispatch(actions.clearForm())
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
