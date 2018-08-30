import React, { Component } from 'react';
import App from "../App";
import LocationsList from "./locations/LocationsList";
import EmployeeList from "./employee/EmployeeList";
import { Route } from 'react-router-dom';
import "./applicationViews.css";
import DataManager from "./DataManager";
import AnimalList from "./animals/AnimalList";
import AnimalEdit from "./animals/AnimalEdit";
import AnimalDetail from './animals/AnimalDetail';
import AnimalForm from "./animals/AnimalForm";
import EmployeeForm from "./employee/EmployeeForm";
import EmployeeDetail from "./employee/EmployeeDetail";
import LocationForm from "./locations/LocationForm";
import LocationDetail from "./locations/LocationDetail";



export default class ApplicationViews extends Component {

//    employeesFromAPI = [
//         { id: 1, name: "Jessica Younker" },
//         { id: 2, name: "Jordan Nelson" },
//         { id: 3, name: "Zoe LeBlanc" },
//         { id: 4, name: "Blaise Roberts" }
//     ]

//     locationsFromAPI = [
//         { id: 1, name: "North Nashville", address: "360 Circle Way" },
//         { id: 2, name: "South Nashville", address: "10101 Binary Court" }
//     ]

//     animalsFromAPI = [
//         { 
//             id: 1, name: "Lumos", type: "cat", image: "http://www.petpatrol.ca/wp-content/uploads/2018/03/Twill1-e1520470143805-250x250.jpg", ownerId: 1
//         },
//         { 
//             id: 2, name: "Stryder", type: "cat", image: "https://i.pinimg.com/originals/0d/97/f5/0d97f5c9fc2f12597247cf59aec5dd81.jpg", ownerId: 2},
//         { 
//             id: 3, name: "Bella", type: "dog", image: "https://s3-media4.fl.yelpcdn.com/bphoto/waZl9lBjVsW-yN1kgCEzuw/ls.jpg", ownerId: 2},
//         { 
//             id: 4, name: "Sgt. Woofers", type:"dog", image: "https://www.dogbreedplus.com/dog_breeds/images/bavarian_mountain_hound.jpg", ownerId: 4},
//         { 
//             id: 5, name: "Grumpy Cat", type: "cat", image: "https://www.petful.com/wp-content/uploads/2011/11/getting-cat-more-affectionate.png", ownerId: 5
//         },
//         { 
//             id: 6, name: "Arcanine", type: "dog", image: "https://s3-media1.fl.yelpcdn.com/bphoto/BSAbUL8BIcholsprIasAaw/ls.jpg", ownerId: 6
//         }
//     ]

//     ownersFromAPI = [
//         { id: 1, name: "Harry Potter", animalId: 1 },
//         { id: 2, name: "Hermione Granger", animalId: 2 },
//         { id: 3, name: "Valerie Bruner", animalId: 3 },
//         { id: 4, name: "Ronald Weasley", animalId: 4 },
//         { id: 5, name: "Kayla Reid", animalId: 5 },
//         { id: 6, name: "Ricky Bruner", animalId: 6 }
//     ]

    state = {
        employees: [],
        locations: [],
        animals: [],
        owners: []
    }
    
    componentDidMount() {
        const newState = {}
        DataManager.getAll("animals")
        .then(allAnimals => {
            newState.animals = allAnimals
        })
        .then(() => {
            DataManager.getAll("employees")
            .then(allEmployees => {
                newState.employees = allEmployees
            }).then(() => {
                DataManager.getAll("owners")
                .then(allOwners => {
                    newState.owners = allOwners
                }).then(() => {
                    DataManager.getAll("locations")
                    .then(allLocations => {
                        newState.locations = allLocations
                    }).then(() => {
                        this.setState(newState)
                    })
                })
            })
        })
    }

    addAnimal = (object) => {
        return DataManager.add("animals", object)
        .then(() => 
            DataManager.getAll("animals"))
        .then(animals =>
            this.setState({ animals: animals })
            )
    }
    addEmployee = (object) => {
        return DataManager.add("employees", object)
        .then(() => 
            DataManager.getAll("employees"))
        .then(employees =>
            this.setState({ employees: employees })
            )
    }
    addLocation = (object) => {
        return DataManager.add("locations", object)
        .then(() => 
            DataManager.getAll("locations"))
        .then(locations =>
            this.setState({ locations: locations })
            )
    }
    

    deleteAnimal = (id) => {
        DataManager.remove("animals", id)
        .then(() => {
            DataManager.getAll("animals")
            .then(animals => 
                this.setState({
                    animals: animals
                }))
        })  
    }

    fireEmployee = (id) => {
        DataManager.remove("employees", id)
        .then(() => {
            DataManager.getAll("employees")
            .then(employees => 
                this.setState({
                    employees: employees
                }))
        })
    }

    // sueOwner = (id) => {
    //     DataManager.remove("owners", id)
    //     .then(() => {
    //         DataManager.getAll("owners")
    //         .then(owners => 
    //             this.setState({
    //                 owners: owners
    //             }))
    //     })
    // }

    demolishLocation = (id) => {
        DataManager.remove("locations", id)
        .then(() => {
            DataManager.getAll("locations")
            .then(locations => 
                this.setState({
                    locations: locations
                }))
        })
    }

    editAnimal = (id, object) => {
        return DataManager.edit("animals", id, object)
        .then(() => 
            DataManager.getAll("animals"))
        .then(animals =>
            this.setState({ animals: animals })
            )
    }
    editEmployee = (id, object) => {
        return DataManager.edit("employees", id, object)
        .then(() => 
            DataManager.getAll("employees"))
        .then(employees =>
            this.setState({ employees: employees })
            )
    }

    render() {
        return (
            <React.Fragment>
                <div className="viewArea">
                    <App />
                    <Route exact path="/locations" render={(props) => {
                        return <LocationsList 
                                    demolishLocation={this.demolishLocation}
                                    locations={this.state.locations} />
                    }} />
                    <Route exact path="/locations/build" render={(props) => {
                        return <LocationForm {...props} 
                                    addLocation={this.addLocation} />
                    }} />
                    <Route exact path="/locations/:locationId(\d+)" render={(props) => {
                        return <LocationDetail {...props} 
                                    demolishLocation={this.demolishLocation}
                                    locations={this.state.locations} />
                    }} />
                    <Route exact path="/animals" render={(props) => {
                        return <AnimalList 
                                    deleteAnimal={this.deleteAnimal} 
                                    animals={this.state.animals}
                                    employees={this.state.employees} />
                    }} />
                    <Route exact path="/animals/intake" render={(props) => {
                        return <AnimalForm {...props} 
                                    addAnimal={this.addAnimal}
                                    employees={this.state.employees} />
                    }} />
                    <Route exact path="/animals/:animalId(\d+)" render={(props) => {
                        return <AnimalDetail {...props} 
                                    deleteAnimal={this.deleteAnimal}
                                    animals={this.state.animals} />
                    }} />
                    <Route exact path="/animals/edit/:animalId(\d+)" render={(props) => {
                        return <AnimalEdit {...props} 
                                    editAnimal={this.editAnimal}
                                    animals={this.state.animals}
                                    employees={this.state.employees} />
                    }} />
                    <Route exact path="/employees" render={(props) => {
                        return <EmployeeList {...props}
                                    fireEmployee={this.fireEmployee}
                                    employees={this.state.employees}
                                    editEmployee={this.editEmployee} />
                    }} />
                    <Route exact path="/employees/hire" render={(props) => {
                        return <EmployeeForm {...props} 
                                    addEmployee={this.addEmployee}
                                    employees={this.state.employees}
                                    editEmployee={this.editEmployee}
                                    fireEmployee={this.fireEmployee} />
                    }} />
                    <Route exact path="/employees/:employeeId(\d+)" render={(props) => {
                        return <EmployeeDetail {...props} 
                                    editEmployee={this.editEmployee}
                                    fireEmployee={this.fireEmployee}
                                    employees={this.state.employees} />
                    }} />
                </div>
            </React.Fragment>
        )
    }
}