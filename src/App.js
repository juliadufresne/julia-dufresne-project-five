import React, { Component } from 'react';
import Entries from './Entries.js';
import prompts from './prompts.js';
import firebase from './firebaseApp.js';
import './App.css';


class App extends Component {
  constructor() {
    super()

    this.state = {
      number: 0,
      input: "",
      enteredInput: "",
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

  generateRandomNumber = () => {
    this.setState({
      number: (Math.floor(Math.random() * 52))
    });
  }

  handleStart = () => {
    console.log("Generating a random prompt");
    this.generateRandomNumber();
  }

  handleChange = (event) => {
    console.log("Catching the text input")
    this.setState({
      input: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.input !== "") {
      const dbRef = firebase.database().ref();
      dbRef.push(this.state.input);
      this.setState({
        enteredInput: this.state.input,
        input: "",
      })
    } else {
      alert("You can't submit an empty journal input!")
    }
  }


  render() {
    return (
      <div className="App">
        <header>
          <h1>Deeper</h1>
          <div class="journalEntry">
            <div class="generatedQuote">
              <h2 class="quote">{prompts[this.state.number].quote}</h2>
              <p class="author">- {prompts[this.state.number].author}</p>
            </div>
            <button onClick={this.handleStart} class="prompt">Generate a quote</button>
            <h3>When you read this quote, what do you think about?</h3>
            <form onSubmit={this.handleSubmit} action="">
              <textarea
                name=""
                id=""
                cols="30"
                rows="8"
                value={this.state.input}
                onChange={this.handleChange}
              ></textarea>
              <button onClick={this.handleSubmit} class="post">Post</button>
            </form>
          </div>
        </header>
        <Entries
          enteredInput={this.state.enteredInput}
          data={this.state.data}
        />
      </div>
    );
  }
}


export default App;
