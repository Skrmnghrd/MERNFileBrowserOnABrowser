import React, { Component } from 'react';
import axios from 'axios';

const Users = props => (
    <li>
          
        <a href="#" onClick={() => {props.deleteUser(props.user._id)}}> 
        Delete:
        </a>
        <p>{props.user.username}</p>
    </li>
)
export default class CreateUsers extends Component {
    constructor(props) { //dis shit is init inpython
        super(props);
        
        //this means self in python
        //in react you need to bind "self" or "this"
        //to each method so you refer it to the whole thing
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.usersList = this.usersList.bind(this);
        this.refreshUsersList = this.refreshUsersList.bind(this);
        this.deleteUser = this.deleteUser.bind(this);

        this.state = {
            users: [],
            username: '',
        }

    }
    componentDidMount(){
        this.refreshUsersList();
    }

    refreshUsersList(){
        
        axios.get("http://localhost:3000/users")
        .then(response => {
            //console.log('REFRESH USERS CALLED');
            
            this.setState( {users: response.data })
            //console.log(this.state.users);
        })
        .catch((error) => {
            console.log('ERROR AT REFRESH USERS');
            console.log(error);
        })

    }
    onChangeUsername(e) {
        //use the state method always in react
        this.setState({
            username: e.target.value
        });     
    }

    usersList(){
        return this.state.users.map(user => {
           return <Users user = { user }
            deleteUser={ this.deleteUser }
           />
        })
    }
    deleteUser(id){
        axios.delete("http://localhost:3000/users/" + String(id))
        .then(res => console.log(res.data))

        .catch( (error) =>{
            console.log(id);
            console.log(error);
        })

        this.setState({
            users: this.state.users.filter(el => el._id != id)
        })
    }
    onSubmit(e) {
        //use a variable inside a mtehod but alwasy use state
        e.preventDefault(); //thou shalt nto submit

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }  

        axios.post('http://localhost:3000/users/add', exercise)
        .then(() => this.refreshUsersList());

        this.setState({
            username: ""
        })
    }
   
    /*
    anything in the { } is react code
    and this. reffers to the whole page, kinda like self in python
    on submit is a method so when you actually submit shit,
    it calls the onSubmit method that we built
    value is the username from the self attribute,
    then on change would be a method that changes the attirbute
      
     */


    render () {
        return (
            <div>
                <h4> You're on the Create Users component!</h4>
                <form onSubmit={ this.onSubmit }> 
                <div className="form-group">
                    <label> Username: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={ this.state.username}
                        onChange= { this.onChangeUsername } 
                    />
                </div>

                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary" />       
                </div>
                </form>
                <div>
                    <ul>
                    { this.usersList() } 
                    </ul>
                </div> 
            </div>
        )
    }
}