import React, { Component } from 'react';


export default class LocationForm extends Component {
    
    state = {
        name: "",
        address: "",
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }
    

    constructNewLocation = () => {
        const location = {
            name: this.state.name,
            address: this.state.address,
        }
        this.props.addLocation(location).then(() => 
            this.props.history.push("/locations")
        )
    }

    render(){
        // console.log(this.props.addAnimal);
        return (
            <div id="add-location-form">
                <label htmlFor="name">Name:</label>
                <input type="text" placeholder="Name of New Location" id="name" onChange={this.handleFieldChange} />
                <label htmlFor="address">Address:</label>
                <input id="address" placeholder="Address of New Location" onChange={this.handleFieldChange} />
                <div className="button-container">
                    <button onClick={this.constructNewLocation}>Build Location</button>
                </div>
            </div>
        )
    }
}