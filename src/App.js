import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = { currentMonth: {} };
  }
  render() {
    return (
      <main className="App">
        <header className="App-header">
        </header>
        <Calendar />
        <section className="App-appointments"></section>
      </main>
    );
  }
}

class Calendar extends Component {
  render() {
    return (
      <section className="App-calendar">

      </section>
    );
  }
}

export default App;
