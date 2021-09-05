import React, { Component } from "react";
import {connect} from 'react-redux';
import * as actions from './../actions/index';
class Sort extends Component {  
    onClick = (sortBy, sortValue) => {       
        this.props.onSort({by:sortBy, value:sortValue});       
    }
    render() {      
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="btn-group">
                    <button
                        type="button"
                        className="btn btn-danger dropdown-toggle"
                        data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false"
                        id="dropdownMenu1"
                    >
                    Sắp xếp
                    </button>
                    <div className="dropdown-menu">
                        <span
                            onClick={() => this.onClick('name', 1)}
                            className="dropdown-item" >Theo A-Z</span>
                        <span
                            onClick={() => this.onClick('name', -1)}
                            className="dropdown-item">Theo Z-A</span>
                        <div className="dropdown-divider"></div>
                        <span
                            onClick={() => this.onClick('status', 1)}
                            className="dropdown-item">Theo active</span>
                        <span
                            onClick={() => this.onClick('status', -1)}
                            className="dropdown-item">Theo unactive</span>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps =()=>{
    return {}
}
const mapDispatchToProps=(dispatch,props)=>{
    return {
        onSort:(sorts)=>{
            dispatch(actions.sortTask(sorts))
        }        
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Sort);