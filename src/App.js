import React, { Component } from 'react';
import './App.css';
import datejs from 'datejs';

class App extends Component {
  constructor() {
    super();

    this.state = { date: new Date() };
  }
  render() {
    return (
      <main className="App">
        <header className="App-header">
        </header>
        <Calendar date={this.state.date} />
        <section className="App-appointments"></section>
      </main>
    );
  }
}

class Calendar extends Component {
  render() {
    // console.log(Date.today())
    const date = this.props.date;
    const year = date.getFullYear();
    const currentMonth = date.getMonth();
    const daysInMonth = Date.getDaysInMonth(year, currentMonth);
    console.log('days-->', daysInMonth);

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const daysOfWeek = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday',
    };

    let calHeaders = [];
    for (const i in daysOfWeek) {
      if (daysOfWeek.hasOwnProperty(i)) {
        const day = daysOfWeek[i].substring(0, 3);
        calHeaders.push(<CalendarHeader key={i} index={i} day={day} />);
      }
    }

    // get last week of last month
    // get first week of first month

    let weeks = [];
    for (let i = 0; i < 6; i++) {
      weeks.push(<Week key={i} />);
    }

    return (
      <section className="App-calendar">
        <table>
          <thead>
            <tr>
              <th>&lt;</th>
              <th>{monthNames[currentMonth]}</th>
              <th>&gt;</th>
            </tr>
          </thead>
        </table>
        <table>
          <thead>
            <tr>{calHeaders}</tr>
          </thead>
          <tbody>
            {weeks}
          </tbody>
        </table>
      </section>
    );
  }
}

class CalendarHeader extends Component {
  render() {
    return (<th key={this.props.index} data-index={this.props.index}>{this.props.day}</th>);
  }
}

class Week extends Component {
  render() {
    let days = [];
    for (let i = 0; i <= 6; i++) {
      days.push(<Day key={i} date={i} />)
    }

    return (<tr>{days}</tr>);
  }
}

class Day extends Component {
  render() {
    // data-date={}
    return (<td >{this.props.date}</td>);
  }
}

export default App;
