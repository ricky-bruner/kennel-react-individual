import React, { Component } from "react";

export default class EmployeeDetail extends Component {
    state = {
        name: "",
        gender: "",
        id: "",
        edit: false
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }
    
    saveEmployee = () => {
        console.log("I was clicked!");
        const editedEmployee = {
            name: this.state.name,
            gender: this.state.gender,
        }
        console.log(editedEmployee);
        this.props.editEmployee(this.props.match.params.employeeId, editedEmployee)
        .then(()=> {
            this.setState({edit: false})
        })
    }
    
    componentDidMount(){
        const employee = this.props.employees.find(e => e.id === parseInt(this.props.match.params.employeeId))
        this.setState({
            name: employee.name,
            gender: employee.gender,
            id: employee.id
        })
    }
    
    editMode = () => {
        this.setState({edit: true})
        console.log(this.state.edit);
    }

    render() {
        return (
            <section className="employee">
                <div key={this.state.id} className="card">
                    <div className="card-body">
                        {
                            this.state.edit === false &&
                            <div>
                                <h4 className="card-title">{this.state.name}</h4>
                                <h5>{this.state.gender}</h5>
                                <button
                                    onClick={this.editMode}
                                    className="card-link">Edit</button>
                                <button
                                    onClick={() => this.props.deleteEmployee(this.state.id)
                                                    .then(() => this.props.history.push("/employees"))}
                                    className="card-link">Fire</button>
                            </div>
                        }
                        {
                            this.state.edit === true &&
                            <div>
                                <input 
                                    defaultValue={this.state.name} 
                                    id="name"
                                    onChange={this.handleFieldChange} />
                                <select 
                                    defaultValue={this.state.gender} 
                                    id="gender" 
                                    onChange={this.handleFieldChange}>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                                <button
                                    className="card-link"
                                    onClick={this.saveEmployee}>Save Changes</button>
                            </div>
                            
                        }
                    </div>
                </div>
            </section>
        )
    }
}