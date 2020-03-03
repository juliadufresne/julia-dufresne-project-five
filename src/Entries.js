import React, { Component } from 'react';
import firebase from 'firebase';

class Entries extends Component {
    constructor() {
        super()

        this.state = {
            posts: []
        }
    }

    // Function to remove posts from Firebase
    removePost = (entry) => {
        // console.log(entry)
        const dbRef = firebase.database().ref();
        dbRef.child(entry).remove();
    }


    render() {
        return (
            <div>
                {this.props.data.map((entry) => {
                    // console.log(entry)
                    // console.log(this.props.data)

                    return (
                        <ul key={entry.key} className="userPost">
                            <div>
                                <li><h3>“{entry.name.quote}”</h3></li>
                                <li className="line"></li>
                                <li><p>{entry.name.input}</p></li>
                                <li><button className="remove" onClick={() => { this.removePost(entry.key) }}>Remove Entry</button></li>
                            </div>
                        </ul>
                    )
                })}
            </div>
        )
    }
}

export default Entries;