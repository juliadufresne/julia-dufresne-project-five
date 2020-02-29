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
      data: [],
      input: "",
      enteredInput: "",
      currentQuote: [],
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
    console.log("Submitting user input")
    event.preventDefault();

    if (this.state.input !== "") {
      const dbRef = firebase.database().ref();

      const posts = {
        quote: prompts[this.state.number].quote,
        input: this.state.input
      }

      dbRef.push(posts);

      this.setState({
        enteredInput: this.state.input,
        input: "",
        currentQuote: prompts[this.state.number].quote,
      })
    } else {
      alert("You can't submit an empty journal input!")
    }
  }


  render() {
    return (
      <div className="App">
        <header>
          <div className="wrapper">
            <h1>Deeper</h1>
            <div className="journalEntry">
              <div className="generatedQuote">
                <h2 className="quote">{prompts[this.state.number].quote}</h2>
                <p className="author">- {prompts[this.state.number].author}</p>
              </div>
              <button onClick={this.handleStart} className="prompt">Generate a quote</button>
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
                <button className="post">Post</button>
              </form>
            </div>
          </div>
        </header>
        <div>
          <p></p>
          <Entries
            enteredInput={this.state.enteredInput}
            data={this.state.data}
            currentQuote={this.state.currentQuote}
          />
        </div>
      </div>
    );
  }
}


export default App;
