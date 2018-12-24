import React, { Component } from 'react';
const uniqid = require('uniquid');
const moment = require('moment');

class AppointmentsList extends Component {
  handleAddAppointment = () => {
    this.props.onNewAppointment(this.props.date);
  }

  handleAppointmentClick = obj => {
    this.props.onLoadAppointment(obj);
  }

  render() {
    const formattedDate = moment(this.props.date).format("DD MMM YY");
    let apps = [];

    if (this.props.appointments.length > 0) {
      apps = this.props.appointments.map((appObj, index) => {
        return (
          <Appointment
            key={index}
            appointment={appObj}
            onAppointmentClick={this.handleAppointmentClick.bind(this)}
          />
        );
      });
    }

    return (
      <section className="App-appointments--list">
        <h4>{`Appointments for ${formattedDate}`}</h4>
        {this.props.appointments.length > 0 &&
          <ul>
            {apps}
          </ul>
        }
        <div className="App-appointments--list_add">
          <button onClick={this.handleAddAppointment.bind(this)}>Add appointment</button>
        </div>
      </section>
    );
  }
}

class Appointment extends Component {
  handleAppointmentClick = () => {
    const appointment = this.props.appointment;
    this.props.onAppointmentClick(appointment[Object.keys(appointment)[0]]);
  }

  render() {
    const appointment = this.props.appointment;
    const appObj = appointment[Object.keys(appointment)[0]];

    return (
      <li onClick={this.handleAppointmentClick.bind(this)}>
        <fieldset>
          <legend>{appObj.title}</legend>
          {appObj.hasOwnProperty('time') && <p>Starts At {appObj.time}</p>}
        </fieldset>
      </li>
    );
  }
}

class AppointmentForm extends Component {
  constructor() {
    super();

    console.log('this.props.active.date-->', this.props);

    this.state = {
      date: '',
      title: '',
      location: '',
      notes: '',
      isAllDay: '',
      startsAt: '',
      endsAt: '',
      repeats: '',
      travelTime: '',
      alert: ''
    };
  }

  handleFormChange = (e) => {
    console.log(e.currentTarget.name);
    console.log(`${e.currentTarget}-->`, e.currentTarget.value);

    this.setState({[e.currentTarget.name]: e.currentTarget.value });
  }

  render() {
    return (
      <section className="App-appointments--form">
        <form action="">
          <fieldset disabled={!this.props.enableEdit}>
            <legend>Appointment Details</legend>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input onChange={this.handleFormChange.bind(this)} value={this.state.date} type="text" name="date" ref="date" readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input onChange={this.handleFormChange.bind(this)} value={this.state.title} type="text" name="title" ref="title" />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input onChange={this.handleFormChange.bind(this)} value={this.state.location} type="text" name="location" ref="location" />
            </div>
            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <textarea onChange={this.handleFormChange.bind(this)} value={this.state.notes} type="text" name="notes" ref="notes"></textarea>
            </div>
          </fieldset>
          <fieldset disabled={!this.props.enableEdit}>
            <legend>Date Settings</legend>
            <div className="form-group-inline">
              <label htmlFor="isAllDay">All Day</label>
              <input onChange={this.handleFormChange.bind(this)} value={this.state.isAllDay} type="checkbox" name="isAllDay" ref="all-day" />
            </div>
            <div className="form-group">
              <label htmlFor="startsAt">Starts At</label>
              <input onChange={this.handleFormChange.bind(this)} value={this.state.startsAt} type="text" name="startsAt" ref="startsAt" />
            </div>
            <div className="form-group">
              <label htmlFor="endsAt">End At</label>
              <input onChange={this.handleFormChange.bind(this)} value={this.state.endsAt} type="text" name="endsAt" ref="endsAt" />
            </div>
            <div className="form-group">
              <label htmlFor="repeats">Repeats</label>
              <input onChange={this.handleFormChange.bind(this)} value={this.state.repeats} type="text" name="repeats" ref="repeats" />
            </div>
            <div className="form-group">
              <label htmlFor="traveltime">Travel Time</label>
              <input onChange={this.handleFormChange.bind(this)} value={this.state.traveltime} type="text" name="traveltime" ref="traveltime" />
            </div>
          </fieldset>
          <fieldset disabled={!this.props.enableEdit}>
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
          <div className="form-group submit">
            <input type="submit" value="Save" />
          </div>
        </form>
      </section>
    );
  }
}

export { AppointmentForm, AppointmentsList };