import React, { Component } from 'react';
import firebase from 'firebase';

class Entries extends Component {
    constructor() {
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
                        <ul key={entry.key} className="userPost">
                            <li><h3>{entry.name.quote}</h3></li>
                            <li><p>{entry.name.input}</p></li>
                            <li><button onClick={() => { this.removeToy(entry.key) }}>Remove Entry</button></li>
                        </ul>
                    )
                })}
            </div>
        )
    }
}

export default Entries;