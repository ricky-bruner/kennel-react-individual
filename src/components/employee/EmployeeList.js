import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class EmployeeList extends Component {
    render() {
        return (
            <article>
                <Link className="nav-link" to={`/employees/hire`}>Add New Employee</Link>
                <h3>Employee List:</h3>
                {
                    this.props.employees.map(employee =>
                        <div key={employee.id} className="employee-card">
                            <p>{employee.name}</p>
                            <Link className="nav-link" to={`/employees/${employee.id}`}>Details</Link>
                            <button onClick={() => this.props.fireEmployee(employee.id)}>Fire Them!</button>
                        </div>
                    )
                }
            </article>
        );
    }
}
