import React, { Component } from 'react';
import prompts from './prompts.js'
import firebase from 'firebase';

class Entries extends Component {
    constructor(){
        super()

        this.state = {
            posts: []
        }
    }


    removeToy = (entry) => {
        const dbRef = firebase.database().ref();
        dbRef.child(entry).remove();
    }



    render() {
        return (
            <div>
                {this.props.data.map((entry) => {
                    console.log(entry)
                    return (
                        <div key={entry.key}>
                            <h2>{entry.name.quote}</h2>
                            <p>{entry.name.input}</p>
                            <button onClick={() => { this.removeToy(entry.key) }}>Remove Entry</button>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Entries;