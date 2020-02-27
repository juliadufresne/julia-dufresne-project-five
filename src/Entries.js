import React, { Component } from 'react';

class Entries extends Component {
    // constructor(){
    //     super()

    //     this.state = {

    //     }
    // }

    render(){
        return(
            <ul>
                <li>Your entry is: {this.props.entry}</li>
            </ul>
        )
    }
}

export default Entries;