import React, { Component } from "react";
import CatIcon from "../../images/caticon.png"
import DogIcon from "../../images/dogicon.png"
import "./animalDetail.css";

export default class AnimalDetail extends Component {
    render() {
        /*
            Using the route parameter, find the animal that the
            user clicked on by looking at the `this.props.animals`
            collection that was passed down from ApplicationViews
        */
        
        const animal = this.props.animals.find(a => a.id === parseInt(this.props.match.params.animalId, 0)) || {}
        
        /* 
            This assigns a logo image for the animal
        */
        
        let animalLogo = "";
        if(animal.type === "Cat"){
            animalLogo = CatIcon
        } else {
            animalLogo = DogIcon
        }
        return (
            <section className="animal">
                <div key={animal.id} className="card">
                    <div className="card-body">
                        <img src={animalLogo} alt={animal.type + " Logo"} className="animal-logo" />
                        <h4 className="card-title">
                            {animal.name}
                        </h4>
                        <h6 className="card-title">{animal.type}</h6>
                        <button
                            onClick={() => this.props.history.push(`/animals/edit/${animal.id}`)}
                            className="card-link">Edit</button>
                        <button
                            onClick={() => this.props.deleteAnimal(animal.id)
                                            .then(() => this.props.history.push("/animals"))}
                            className="card-link">Delete</button>
                    </div>
                </div>
            </section>
        )
    }
}