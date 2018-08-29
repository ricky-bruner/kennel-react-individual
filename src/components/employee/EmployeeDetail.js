import React, { Component } from "react";

export default class EmployeeDetail extends Component {
    render() {
        
        const employee = this.props.employees.find(e => e.id === parseInt(this.props.match.params.employeeId, 0)) || {}

        return (
            <section className="employee">
                <div key={employee.id} className="card">
                    <div className="card-body">
                        <h4 className="card-title">
                            {employee.name}
                        </h4>
                        <button
                            onClick={() => this.props.deleteEmployee(employee.id)
                                            .then(() => this.props.history.push("/employees"))}
                            className="card-link">Edit</button>
                        <button
                            onClick={() => this.props.deleteEmployee(employee.id)
                                            .then(() => this.props.history.push("/employees"))}
                            className="card-link">Delete</button>
                    </div>
                </div>
            </section>
        )
    }
}