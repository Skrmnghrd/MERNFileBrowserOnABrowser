import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+String(props.exercise._id)}>Edit</Link> || 
            <a href="#" onClick={() => {props.deleteExercise(props.exercise._id) } }>Delete</a>
        </td>
       
    </tr>
)

export default class ExercisesList extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);
        
        this.state = {exercises: [] };
    }

    componentDidMount(){
        axios.get("http://localhost:3000/exercises/")
        .then(response => {
            this.setState( {exercises: response.data}) //it's gonna be a json on exercises array
        })
        .catch((error) => {
            console.log(error);
        })
    }

    deleteExercise(id){
        axios.delete("http://localhost:3000/exercises/"+ String(id))
        .then(res => console.log(res.data) )
        
        .catch((error) => {
            console.log(error);
        })

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList() {
        //.map is going to return something from the element into the array
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise={ currentexercise } 
            deleteExercise={ this.deleteExercise } 
            key={ currentexercise._id }
            //no need na ni ang key, so basically these are arguments passed to a component
            />;
        })
    }
    render () {
        return (
            <div>
                <h4> Logged exercises </h4>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Userame</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>
            </div>
        )
    }
}