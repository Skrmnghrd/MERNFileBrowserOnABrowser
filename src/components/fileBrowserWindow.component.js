import React, { Component } from 'react';
import axios from 'axios';

//nd pg klipati ang sc sang imo nahimo

export default class CreateUsers extends Component {
    constructor(props)
    {
        super(props);

        this.state = {
            data: [], //put actual data for initial
            folderName: "",
        }
        
        //bind this 
        this.onClickButton = this.onClickButton.bind(this);
    }
    
    componentDidMount(){
        
        let dirAndCommand = {
            "directory" : "../",
            "command" : "-la"
        }

        axios.post('http://localhost:3001/changeDir/', dirAndCommand)
            .then((res) => {
                console.log(res.data.msg.data);
                this.setState(this.state.data = res.data.msg.data);
            })
            .catch(err =>
            {
                console.log(err);
            });


    }
    onClickButton(e){
        let dirAndCommand = {
            "directory" : "../",
            "command" : "-la"
        }

        axios.post('http://localhost:3001/changeDir/', dirAndCommand)
            .then((res) => {
                console.log(res.data.msg.data);
                this.setState(this.state.data = res.data.msg.data);
            })
            .catch((err) =>
            {
                console.log(err);
            });
    }
    render(){ return(
        <div>
            { 
                this.state.data.map(function(content){
                    return( 
                    <div>{content}</div>
                        );
                })
            }
            <button onClick={ this.onClickButton }> :) </button>
        </div>
        
            
        
    )}
    

}