import React, { Component } from 'react';
import './App.css';
import Calendar from './Components/Calendar';
import {AppointmentForm, AppointmentsList} from './Components/Appointments';
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
      },
      enableEdit: false,
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

  handleNewAppointment = (date) => {
    this.setState({enableEdit: true});
  }

  handleLoadAppointment = obj => {
    this.setState({enableEdit: true});
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
        <AppointmentForm enableEdit={this.state.enableEdit} active={this.state.active}/>
        <AppointmentsList
          date={this.state.active.date}
          appointments={this.state.active.appointments} 
          onNewAppointment={this.handleNewAppointment.bind(this)}
          onLoadAppointment={this.handleLoadAppointment.bind(this)} 
        />
      </main>
    );
  }
}

export default App;
