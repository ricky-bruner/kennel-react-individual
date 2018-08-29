import React, { Component } from 'react';
// import "./animalForm.css"

export default class EmployeeForm extends Component {
    
    state = {
        name: "",
        gender: ""
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }
    

    constructNewEmployee = () => {
        const employee = {
            name: this.state.name,
            gender: this.state.gender
        }
        this.props.addEmployee(employee).then(() => 
            this.props.history.push("/employees")
        )
    }

    render(){
        return (
            <div id="add-employee-form">
                <label htmlFor="name">Name:</label>
                <input type="text" placeholder="Full Name please" id="name" onChange={this.handleFieldChange} />
                <select id="gender" onChange={this.handleFieldChange}>
                    <option value="default">Select Gender</option>  
                    <option value="Male">Male</option>  
                    <option value="Female">Female</option>  
                </select>
                <div className="button-container">
                    <button onClick={this.constructNewEmployee}>Add Employee</button>
                </div>
            </div>
        )
    }
}