import React, { Component } from 'react';
import UserInput from './UserInput.js';
import prompts from './prompts.js';
import './App.css';


class App extends Component {
  constructor(){
    super()

    this.state = {
      number: 0
    }
}

  generateRandomNumber = () => {
    this.setState({
      number: (Math.floor(Math.random() * 52))
    });
}

  handleStart = () => {
    console.log("Generating a random prompt");
    this.generateRandomNumber();
}

  render(){
    return (
      <div className="App">
        <h1>Deeper</h1>
        <button onClick={this.handleStart}>Get a quote!</button>
        <p>{prompts[this.state.number].quote}</p>
        <UserInput />
      </div>
    );
  }
  }


export default App;
