import React, { Component } from 'react';
import firebase from 'firebase';

class Entries extends Component {
    removeToy = (entry) => {
        const dbRef = firebase.database().ref();

        dbRef.child(entry).remove();
    }

    render() {
        return (
            <ul>
                {/* <li>Your entry is: {this.props.entry}</li> */}
                {this.props.data.map((entry) => {
                    return (
                        <li key={entry.key}>
                            <p>{entry.name}</p>
                            <button onClick={() => { this.removeToy(entry.key) }}>Remove Toy</button>
                        </li>
                    )
                })}
            </ul>
        )
    }
}

export default Entries;