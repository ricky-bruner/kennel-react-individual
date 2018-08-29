import React, { Component } from 'react';
import "./animals.css"
import { Link } from "react-router-dom";
import CatIcon from "../../images/caticon.png"
import DogIcon from "../../images/dogicon.png"

export default class AnimalList extends Component {
    render() {
        
        return (
            <div id="animal-container">
                <Link className="nav-link" to={`/animals/intake`}>Add Animal</Link>
                <h3>Animal List:</h3>
                <div className="animal-card-container">
                {
                    this.props.animals.map((animal) => {
                        let employee = this.props.employees.find(employee => employee.id === animal.employee)
                        let animalLogo = "";
                        if(animal.type === "Cat"){
                            animalLogo = CatIcon
                        } else {
                            animalLogo = DogIcon
                        }
                        return  <div className="animal-card" key={animal.id}>
                                    <img src={animalLogo} alt={animal.type + " Logo"} className="animal-logo" />
                                    <h4>{animal.name}</h4>
                                    <h5>{animal.type}</h5>
                                    <h5>In Care of: {employee.name}</h5>
                                    <Link className="nav-link" to={`/animals/${animal.id}`}>Details</Link>
                                    <button onClick={() => this.props.deleteAnimal(animal.id)}>Release</button>
                                </div>
                        })
                }
                    
                
                </div>
            </div>
        );
    }
}