import React, { Component } from 'react';
import "./animalForm.css"

export default class AnimalForm extends Component {
    
    state = {
        name: "",
        type: "",
        employee: "",
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }
    

    constructNewAnimal = () => {
        console.log(this.state.employee);
        const animal = {
            name: this.state.name,
            type: this.state.type,
            employee: this.props.employees.find(employee => employee.name === this.state.employee).id
        }
        this.props.addAnimal(animal).then(() => 
            this.props.history.push("/animals")
        )
    }

    render(){
        // console.log(this.props.addAnimal);
        return (
            <div id="add-animal-form">
                <label htmlFor="name">Name:</label>
                <input type="text" placeholder="Woofers or Meowers" id="name" onChange={this.handleFieldChange} />
                <label htmlFor="type">Type of Animal:</label>
                <select id="type" onChange={this.handleFieldChange}>
                    <option value="default">Select Animal Type</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                </select>
                <label htmlFor="employee">Assign an Employee</label>
                <select id="employee" onChange={this.handleFieldChange}>
                    <option>Select an Employee</option>
                    {
                        this.props.employees.map(employee => 
                            <option key={employee.id}>{employee.name}</option>
                        )
                    }
                </select>
                <div className="button-container">
                    <button onClick={this.constructNewAnimal}>Add Animal</button>
                </div>
            </div>
        )
    }
}