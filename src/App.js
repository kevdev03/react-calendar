import React, { Component } from 'react';
import './App.css';
import Calendar from './Components/Calendar';
const uniqid = require('uniquid');
const moment = require('moment');

class App extends Component {
  constructor() {
    super();

    const monthRange = this.getMonthRange(moment().format('YYYY-MM'));
    const today = moment().format('YYYY-MM-DD');

    this.state = {
      range: monthRange,
      appointments: {
        '2018-11-01': [
          {
            'w0r98tw0r': {
              'title': 'Halloween Party',
              'description': 'At Office',
              'time': '12:00 PM',
            }
          },
          {
            'e0q98r0qe9wr': {
              'title': 'Trick or Treat',
              'description': 'School Quadrangle',
              'time': '3:00 PM',
            }
          },
        ],
        '2018-12-01': [
          {
            '32i4ui234': {
              'title': 'Dental Appointment',
              'description': 'Molar Extraction',
              'time': '9:00 AM',
            }
          },
          {
            'a98ds7fa98sf': {
              'title': 'Family Dinner',
              'description': "At Fazoli's",
              'time': '7:30 PM',
            }
          },
          {
            'as89d7fa': {
              'title': 'Pick Up James',
              'description': 'At School',
              'time': '4:00 PM',
            }
          },
        ],
        '2018-12-23': [
          {
            'ad980s7fa': {
              'title': 'Office party',
              'description': 'Bring donuts',
              'time': '3:00 PM',
            }
          },
        ],
        '2018-12-30': [
          {
            'x9cv87bx08': {
              'title': 'End of year party',
              'description': 'Bring pizza (3 boxes)',
              'time': '5:00 PM',
            }
          },
        ],
      },
      active: {
        date: today,
        appointments: []
      }
    };

    // this.setState({active: {appointments: this.state.appointments[today]}});
  }

  getMonthRange = (currentDate) => {
    const mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    // console.log('currentDate-->', currentDate);
    const year = currentDate.split('-')[0];
    const monthIndex = currentDate.split('-')[1] - 1;

    // console.log('year-->', year);
    // console.log('month-->', monthIndex);

    const prevMonth = moment({ year: year, month: monthIndex }).add(-1, 'month').format('YYYY-MM'); // same as subtract
    const currentMonth = moment({ year: year, month: monthIndex }).add(0, 'month').format('YYYY-MM');
    const nextMonth = moment({ year: year, month: monthIndex }).add(1, 'month').format('YYYY-MM');

    // console.log('prevMonth-->', prevMonth);
    // console.log('currentMonth-->', currentMonth);
    // console.log('nextMonth-->', nextMonth);

    return [
      { my: prevMonth, mS: mS[parseInt(prevMonth.split('-')[1]) - 1], },
      { my: currentMonth, mS: mS[parseInt(currentMonth.split('-')[1]) - 1], },
      { my: nextMonth, mS: mS[parseInt(nextMonth.split('-')[1]) - 1], },
    ]
  }

  handleTraversal = (action) => {
    // console.log('action-->', action);
    let state = this.state;
    const current = state.range[1];
    const dateArray = current.my.split('-');
    const year = dateArray[0];
    const monthIndex = dateArray[1];
    const newDate = moment({ year: year, month: monthIndex - 1, day: 1 }).add(action, 'month').format('YYYY-MM');

    this.setState({ range: this.getMonthRange(newDate) });
  }

  handleDayClick = (date) => {
    const state = this.state;

    state.active.date = date;
    state.active.appointments = state.appointments[date] || [];

    this.setState({ active: state.active });
  }

  render() {
    return (
      <main className="App">
        <header className="App-header">
        </header>
        <Calendar
          data={this.state}
          onTraversal={this.handleTraversal.bind(this)}
          appointments={this.state.appointments}
          onDayClick={this.handleDayClick.bind(this)}
          active={this.state.active} />
        <AppointmentForm />
        <AppointmentContainer
          date={this.state.active.date}
          appointments={this.state.active.appointments} />
      </main>
    );
  }
}

class AppointmentContainer extends Component {
  render() {
    return (<section className="App-appointments--list"></section>);
  }
}

class AppointmentForm extends Component {
  render() {
    return (
      <section className="App-appointments--form">
        <form action="">
          <fieldset>
            <legend>Appointment Details</legend>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input type="text" name="title" ref="title" />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input type="text" name="location" ref="location" />
            </div>
            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <textarea type="text" name="notes" ref="notes"></textarea>
            </div>
          </fieldset>
          <fieldset>
            <legend>Date Settings</legend>
            <div className="form-group-inline">
              <label htmlFor="all-day">All Day</label>
              <input type="checkbox" name="all-day" ref="all-day" />
            </div>
            <div className="form-group">
              <label htmlFor="starts-at">Starts At</label>
              <input type="text" name="starts-at" ref="starts-at" />
            </div>
            <div className="form-group">
              <label htmlFor="ends-at">End At</label>
              <input type="text" name="ends-at" ref="ends-at" />
            </div>
            <div className="form-group">
              <label htmlFor="repeats">Repeats</label>
              <input type="text" name="repeats" ref="repeats" />
            </div>
            <div className="form-group">
              <label htmlFor="travel-time">Travel Time</label>
              <input type="text" name="travel-time" ref="travel-time" />
            </div>
          </fieldset>
          <fieldset>
            <legend>Notifications</legend>
            <div className="form-group">
              <label htmlFor="alert">Alert</label>
              <select name="alert" ref="alert">
              <option value="0">Select one</option>
              <option value="1">At time of event</option>
              <option value="2">5 minutes before</option>
              <option value="3">10 minutes before</option>
              <option value="4">15 minutes before</option>
              <option value="5">30 minutes before</option>
              </select>
            </div>
          </fieldset>
        </form>
      </section>
    );
  }
}

export default App;
