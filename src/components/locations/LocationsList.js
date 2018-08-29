import React, { Component } from 'react';
import "./locations.css"
import { Link } from "react-router-dom";

export default class LocationList extends Component {
    render() {
        return (
            <article>
                <Link className="nav-link" to={`/locations/build`}>Add New Location</Link>
                <h3>Locations:</h3>
                <div className="locations">
                {
                    this.props.locations.map(location =>
                        <ul className="location-ul" key={location.id}>
                            <h4>{location.name}</h4>
                            <p>{location.address}</p>
                            <div className="button-container">
                                <button onClick={() => this.props.demolishLocation(location.id)}>Demolish</button>
                            </div>
                        </ul>
                    )
                }
                </div>
            </article>
        );
    }
}
