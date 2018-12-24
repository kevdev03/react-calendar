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
              'notes': 'At Office',
              'time': '12:00 PM',
            }
          },
          {
            'e0q98r0qe9wr': {
              'title': 'Trick or Treat',
              'notes': 'School Quadrangle',
              'time': '3:00 PM',
            }
          },
        ],
        '2018-12-01': [
          {
            '32i4ui234': {
              'title': 'Dental Appointment',
              'notes': 'Molar Extraction',
              'time': '9:00 AM',
            }
          },
          {
            'a98ds7fa98sf': {
              'title': 'Family Dinner',
              'notes': "At Fazoli's",
              'time': '7:30 PM',
            }
          },
          {
            'as89d7fa': {
              'title': 'Pick Up James',
              'notes': 'At School',
              'time': '4:00 PM',
            }
          },
        ],
        '2018-12-23': [
          {
            'ad980s7fa': {
              'title': 'Office party',
              'notes': 'Bring donuts',
              'time': '3:00 PM',
            }
          },
        ],
        '2018-12-30': [
          {
            'x9cv87bx08': {
              'title': 'End of year party',
              'notes': 'Bring pizza (3 boxes)',
              'time': '5:00 PM',
            }
          },
        ],
      },
      active: {
        date: today,
        appointments: [],
      },
      enableEdit: false,
    };
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
    state.active.selected = '';

    this.setState({ enableEdit: false, active: state.active });
  }

  handleNewAppointment = (date) => {
    console.info('handleNewAppointment');
    this.setState({enableEdit: true});
  }

  handleLoadAppointment = uid => {
    // console.log('obj-->', obj);
    const state = this.state;
    state.active.selected = uid;
    state.enableEdit = true;
    this.setState(state);
  }

  handleFormSubmit = form => {
    const uid = Object.keys(form)[0];
    const formObj = form[uid];
    const activeDate = formObj.date;
    const state = this.state;
    const appointmentObj = state.appointments;
    // appointment update
    const selected = (state.active.hasOwnProperty('selected') && state.active.hasOwnProperty.length > 0) && this.state.active.selected;

    if ((appointmentObj.hasOwnProperty(activeDate)) && (appointmentObj[activeDate].length > 0)) {

      if (selected) {
        const activeAppointments = appointmentObj[activeDate].filter(app => Object.keys(app)[0] !== selected);
        activeAppointments.push(form);
        appointmentObj[activeDate] = activeAppointments;        
      } else {
        appointmentObj[activeDate].push(form)
      }
    } else {
      appointmentObj[activeDate] = [form];
    }
    this.setState(
      {
        active: {
          appointments: appointmentObj[activeDate],
          date: formObj.date,
          selected: false
        },
        appointments: appointmentObj,
      });
  }

  render() {
    return (
      <main className="App">
        <header className="App-header">
        </header>
        <Calendar
          data={this.state}
          onTraversal={this.handleTraversal.bind(this)}
          onDayClick={this.handleDayClick.bind(this)}
        />
        <AppointmentForm 
          enableEdit={this.state.enableEdit} 
          active={this.state.active}
          onSubmit={this.handleFormSubmit.bind(this)}
        />
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
