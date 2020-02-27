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

    componentDidMount() {
        const dbRef = firebase.database().ref();

        dbRef.on('value', (response) => {
            const dataFromDb = response.val();

            const stateToBeSet = [];

            for (let key in dataFromDb) {
                const journalEntries = {
                    key: key,
                    name: dataFromDb[key],
                }
                stateToBeSet.push(journalEntries);
            }

            this.setState({
                data: stateToBeSet,
            })
        })
    }

    handleChange = (event) => {
        console.log("Catching the text input")
        this.setState({
            input: event.target.value,
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.input !== ""){
            const dbRef = firebase.database().ref();
            dbRef.push(this.state.input);
            this.setState({
                entry: this.state.input,
                input: "",
            })
        }  else {
            alert("You can't submit an empty journal entry!") 
        }
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
                    data={this.state.data}
                />
            </div>
        )
    }
}



export default UserInput;
