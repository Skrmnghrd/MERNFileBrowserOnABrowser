import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';


export default class EditExercise extends Component {
    //constructor, like init in python
    constructor(props) {
        super(props);


        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []  //get actual users from db and set this in state
            //in react, create variables at state, not let
            //you're gonna have to access this shit later
        }
    }

    componentDidMount() {
        //called before anything displays on the page
        //before anythign loads
        axios.get("http://localhost:3000/exercises/" + String(this.props.match.params.id))
        .then(response => {
            this.setState({
                username: response.data.username,
                description: response.data.description,
                duration: response.data.duration,
                date: new Date(response.data.date),
            })
        })
        .catch(function (error) {
            console.log(error);
        })

        axios.get("http://localhost:3000/users")
        .then(response => {
            if ( response.data.length > 0 ) {
                this.setState({ 
                    users: response.data.map(user => user.username), //map will map the array to r
                })
            }
        })
    }

    onChangeUsername(e) {
        //use the state method always in react
        this.setState({
            username: e.target.value
        });     
    }
    onChangeDescription(e) {
        //use the state method always in react
        this.setState({
            description: e.target.value
        });     
    }
    onChangeDuration(e) {
        //use the state method always in react
        this.setState({
            duration: e.target.value
        });     
    }
    onChangeDate(date) {
        //use the state method always in react
        this.setState({
            date: date
        });     
    }
    onClickClearInput(e)
        {
            e.target.value = ""

        }

    onSubmit(e) {
        //use a variable inside a mtehod but alwasy use state
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        
        //should be submitting the ex to the db
        axios.post('http://localhost:3000/exercises/update/', + 
        String(this.props.match.params.id), exercise)
            .then(res => console.log(res.data));

        console.log('passed exercise');
    }
    render () {
        return (
            <div>
                <h4>Edit Exercise Log</h4>
                <form onSubmit={ this.onSubmit }>
                    <div className="form-group">
                        <label>Username:</label>
                        <select ref="userInput"
                            required className="form-control"
                            value={this.state.username}

                            onChange={this.onChangeUsername}>
                        {
                            this.state.users.map(function(user)
                            {
                                return <option
                                key={user}
                                value={user}>
                                    {user}
                                </option>
                            })
                        }    
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={ this.state.description }
                        onClick={ this.onClickClearInput }
                        onChange={ this.onChangeDescription }
                        />
                    </div>

                    <div className="form-group">
                        <label> Duration (in minutes): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={ this.state.duration }
                            onChange={ this.onChangeDuration }
                            />
                    </div>

                    <div className="form-group">
                        <label> Date: </label>
                        <div>
                            <DatePicker
                            selected={ this.state.date }
                            onChange={ this.onChangeDate }
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Edit Exercise Log"
                        className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}