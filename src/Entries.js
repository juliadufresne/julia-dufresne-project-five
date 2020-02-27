import React, { Component } from 'react';
import firebase from 'firebase';

class Entries extends Component {
    removeToy = (entry) => {
        const dbRef = firebase.database().ref();

        dbRef.child(entry).remove();
    }

    render() {
        return (
            <div>
                {this.props.data.map((entry) => {
                    return (
                        <div key={entry.key}>
                            <p>{entry.name}</p>
                            <button onClick={() => { this.removeToy(entry.key) }}>Remove Entry</button>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Entries;