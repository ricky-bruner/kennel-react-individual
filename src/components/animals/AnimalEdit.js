import React, { Component } from "react";

export default class AnimalEdit extends Component {
    state = {
        name: "",
        type: "",
        employee: ""
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }
    

    saveAnimal = () => {
        const editedAnimal = {
            name: this.state.name,
            type: this.state.type,
            employee: this.props.employees.find(e => this.state.employee === e.name).id
        }
        this.props.editAnimal(this.props.match.params.animalId, editedAnimal).then(() => 
            this.props.history.push("/animals")
        )
    }
    componentDidMount(){
        const animal = this.props.animals.find(a => a.id === parseInt(this.props.match.params.animalId, 0)) || {}
        const employee = this.props.employees.find(e => e.id === animal.employee)
        console.log(employee)
        console.log(this.props);
        this.setState({
            name: animal.name,
            type: animal.type,
            employee: employee.id
        })
    }
    render(){
        return (
            <div id="add-animal-form">
                <label htmlFor="name">Name:</label>
                <input type="text" defaultValue={this.state.name} placeholder="Woofers or Meowers" id="name" onChange={this.handleFieldChange} />
                <label htmlFor="type">Type of Animal:</label>
                <select id="type" defaultValue={this.state.type} onChange={this.handleFieldChange}>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                </select>
                <select id="employee" onChange={this.handleFieldChange}>
                    {
                        this.props.employees.map(employee => 
                            <option key={employee.id}>{employee.name}</option>
                        )
                    }
                </select>
                <div className="button-container">
                    <button onClick={this.saveAnimal}>Save Changes</button>
                </div>
            </div>
        )
    }
}
