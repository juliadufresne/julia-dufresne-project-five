import React, { Component } from 'react';
import Entries from './Entries.js';
import firebase from './firebaseApp.js';

class UserInput extends Component {
    constructor() {
        super()

        this.state = {
            input: "",
            entry: "",
            data: [],
        }
    }

    handleChange = (event) => {
        console.log("Catching the text input")
        this.setState({
            input: event.target.value,
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const dbRef = firebase.database().ref();

        dbRef.push(this.state.input);

        this.setState({
            entry: this.state.input,
            input: "",
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} action="">
                    <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        value={this.state.input}
                        onChange={this.handleChange}
                    ></textarea>
                    <button onClick={this.handleSubmit}>Post!</button>
                </form>
                <Entries
                    entry={this.state.entry}
                />
            </div>
        )
    }
}



export default UserInput;
