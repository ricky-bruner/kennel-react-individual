import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FemaleIcon from "../../images/femaleIcon.png";
import MaleIcon from "../../images/maleIcon.png";
import "./employeeList.css";

export default class EmployeeList extends Component {
    state = {
        employees: []
    }
    
    handleFieldChange = (evt) => {
        let key = evt.target.id
        let targetId = parseInt(evt.target.parentElement.parentElement.parentElement.id.split("--")[1])
        let employeeEdit = this.state.employees.find(e => e.id === targetId)
        employeeEdit[key] = evt.target.value
        let allEmployees = []
        let beginningEmployees = this.state.employees.filter(e => e.id < targetId)
        let endEmployees = this.state.employees.filter(e => e.id > targetId)
        beginningEmployees.forEach(e => allEmployees.push(e));
        allEmployees.push(employeeEdit);
        endEmployees.forEach(e => allEmployees.push(e));
        this.setState({employees: allEmployees});
    }
    
    saveEmployee = (employee) => {
        let editedEmployee = this.state.employees.find(e => e.id === employee.id)
        editedEmployee.edit = false
        this.props.editEmployee(employee.id, editedEmployee)
        .then(()=> {
            let allEmployees = []
            let beginningEmployees = this.state.employees.filter(e => e.id < employee.id)
            let endEmployees = this.state.employees.filter(e => e.id > employee.id)
            beginningEmployees.forEach(e => allEmployees.push(e));
            allEmployees.push(editedEmployee);
            endEmployees.forEach(e => allEmployees.push(e));
            this.setState({employees: allEmployees});
        })
    }

    componentDidMount(){
        let beefedUpEmp = []
        this.props.employees.map(e => {
            e.detail = false;
            e.edit = false;
            beefedUpEmp.push(e);
        })
        this.setState({employees: beefedUpEmp})
    }
    
    detailMode = (employee) => {
        let detailChange = this.state.employees.find(e => e.id === employee.id)
        detailChange.detail = true
        let allEmployees = []
        let beginningEmployees = this.state.employees.filter(e => e.id < employee.id)
        let endEmployees = this.state.employees.filter(e => e.id > employee.id)
        beginningEmployees.forEach(e => allEmployees.push(e));
        allEmployees.push(detailChange);
        endEmployees.forEach(e => allEmployees.push(e));
        this.setState({employees: allEmployees});
    }
    
    editMode = (employee) => {
        let editChange = this.state.employees.find(e => e.id === employee.id)
        editChange.edit = true
        editChange.detail = false
        let allEmployees = []
        let beginningEmployees = this.state.employees.filter(e => e.id < employee.id)
        let endEmployees = this.state.employees.filter(e => e.id > employee.id)
        beginningEmployees.forEach(e => allEmployees.push(e));
        allEmployees.push(editChange);
        endEmployees.forEach(e => allEmployees.push(e));
        this.setState({employees: allEmployees});
    }
    
    render() {
        return (
            <article>
                <Link className="nav-link" to={`/employees/hire`}>Add New Employee</Link>
                <h3>Employee List:</h3>
                <div className="employee-card-container">
                {
                    this.state.employees.map(employee => {
                        let employeeLogo = "";
                        if(employee.gender === "Female"){
                            employeeLogo = FemaleIcon
                        } else {
                            employeeLogo = MaleIcon
                        }
                        return (
                            <div key={employee.id} className="employee-card" id={"employee--" + `${employee.id}`}>
                                <div className="employee-card-left" >
                                    <img src={employeeLogo} alt="gender logo" />
                                </div>
                                <div className="employee-card-right">
                                {
                                    employee.detail === false &&
                                    employee.edit === false &&
                                    <div>
                                        <h2>{employee.name}</h2>
                                        <button className="card-link" onClick={() => {this.detailMode(employee)}}>Details</button>
                                    </div>
                                }
                                {
                                    employee.detail === true &&
                                    <div>
                                        <h4 className="card-title">{employee.name}</h4>
                                        <h5>{employee.gender}</h5>
                                        <button
                                            onClick={() => {this.editMode(employee)}}
                                            className="card-link">Edit</button>
                                        <button
                                            onClick={() => this.props.deleteEmployee(employee.id)
                                                            .then(() => this.props.history.push("/employees"))}
                                            className="card-link">Fire</button>
                                    </div>
                                }
                                {
                                    employee.edit === true &&
                                        <div>
                                            <input defaultValue={employee.name} id="name" onChange={this.handleFieldChange} />
                                            <select defaultValue={employee.gender} id="gender" onChange={this.handleFieldChange}>
                                                <option>Male</option>
                                                <option>Female</option>
                                            </select>
                                            <div>
                                                <button
                                                    className="card-link"
                                                    onClick={() => {this.saveEmployee(employee)}}>Save Changes</button>
                                            </div>
                                        </div>
                                }
                                </div>
                            </div>
                        )
                    }) || {}
                }
                </div>
            </article>
        );
    }
}
