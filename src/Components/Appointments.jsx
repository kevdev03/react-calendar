import React, { Component } from 'react';
const uniqid = require('uniquid');
const moment = require('moment');

class AppointmentsList extends Component {
  handleAddAppointment = () => {
    this.props.onNewAppointment(this.props.date);
  }

  handleAppointmentClick = uid => {
    this.props.onLoadAppointment(uid);
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
    this.props.onAppointmentClick(Object.keys(appointment)[0]);
  }

  render() {
    const appointment = this.props.appointment;
    const uid = Object.keys(appointment)[0];
    const appObj = appointment[uid];

    return (
      <li onClick={this.handleAppointmentClick.bind(this)}>
        <fieldset>
          <legend>{appObj.title}</legend>
          <p>{appObj.location}</p>
          <p>{appObj.startsAt} &mdash; {appObj.endsAt}</p>
          <p>{appObj.notes}</p>
          <small>uid: {uid}</small>
        </fieldset>
      </li>
    );
  }
}

class AppointmentForm extends Component {
  constructor() {
    super();

    this.state = {
      date: '',
      title: '',
      location: '',
      notes: '',
      isAllDay: false,
      startsAt: '',
      endsAt: '',
      repeats: '',
      travelTime: '',
      alert: 0
    };
  }

  componentWillReceiveProps() {
    this.resetForm();

    const appointments = this.props.active.appointments;
    const active = this.props.active;
    const selected = (active.hasOwnProperty('selected') && active.hasOwnProperty.length > 0) && active.selected;

    if (appointments.length > 0 && selected) {
      const activeAppointment = appointments.filter(app => Object.keys(app)[0] === selected);
      activeAppointment[0][selected]['date'] = active.date;
      this.setState(activeAppointment[0][selected]);
    }
  }

  resetForm = () => {
    this.setState({
      date: '',
      title: '',
      location: '',
      notes: '',
      isAllDay: false,
      startsAt: '',
      endsAt: '',
      repeats: '',
      travelTime: '',
      alert: 0
    });
  }

  handleFormChange = e => {
    this.setState({ [e.currentTarget.name]: (e.currentTarget.type === 'checkbox' ? e.currentTarget.checked : e.currentTarget.value) });
  }

  handleSubmit = e => {
    e.preventDefault();
    let formObj = {
      [uniqid()]: {
        date: this.refs.date.value,
        title: this.refs.title.value,
        location: this.refs.location.value,
        notes: this.refs.notes.value,
        isAllDay: this.refs.isAllDay.checked,
        startsAt: this.refs.startsAt.value,
        endsAt: this.refs.endsAt.value,
        repeats: this.refs.repeats.value,
        travelTime: this.refs.travelTime.value,
        alert: this.refs.alert.value,
      }
    };
    this.resetForm();

    this.props.onSubmit(formObj);

  }

  setSampleData = (e) => {
    e.preventDefault();
    this.setState({
      date: this.props.active.date,
      title: "Soccer practice",
      location: "School grounds",
      notes: "Pads, Uniform, Going home clothes, Soccer ball",
      isAllDay: false,
      startsAt: "12:00",
      endsAt: "17:00",
      repeats: "",
      travelTime: "15 mins",
      alert: "15"
    });
  }

  render() {
    return (
      <section className="App-appointments--form">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <fieldset disabled={!this.props.enableEdit}>
            <legend>
              Appointment Details
              <small>uid:</small>
            </legend>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                onChange={this.handleFormChange.bind(this)}
                value={this.state.date}
                type="text"
                name="date"
                ref="date"
                readOnly />
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
              <input onChange={this.handleFormChange.bind(this)} value={this.state.isAllDay} type="checkbox" name="isAllDay" ref="isAllDay" />
            </div>
            <div className="form-group">
              <label htmlFor="startsAt">Starts At</label>
              <input onChange={this.handleFormChange.bind(this)} value={this.state.startsAt} type="time" name="startsAt" ref="startsAt" />
            </div>
            <div className="form-group">
              <label htmlFor="endsAt">End At</label>
              <input onChange={this.handleFormChange.bind(this)} value={this.state.endsAt} type="time" name="endsAt" ref="endsAt" disabled={!this.state.isAllDay}/>
            </div>
            <div className="form-group">
              <label htmlFor="repeats">Repeats</label>
              <input onChange={this.handleFormChange.bind(this)} value={this.state.repeats} type="text" name="repeats" ref="repeats" />
            </div>
            <div className="form-group">
              <label htmlFor="travelTime">Travel Time</label>
              <input onChange={this.handleFormChange.bind(this)} value={this.state.travelTime} type="text" name="travelTime" ref="travelTime" />
            </div>
          </fieldset>
          <fieldset disabled={!this.props.enableEdit}>
            <legend>Notifications</legend>
            <div className="form-group">
              <label htmlFor="alert">Alert</label>
              <select onChange={this.handleFormChange.bind(this)} value={this.state.alert} name="alert" ref="alert">
                <option value="0">Select one</option>
                <option value="1">At time of event</option>
                <option value="5">5 minutes before</option>
                <option value="10">10 minutes before</option>
                <option value="15">15 minutes before</option>
                <option value="30">30 minutes before</option>
              </select>
            </div>
          </fieldset>
          {this.props.enableEdit &&
            <div className="side-by-side">
              <div className="form-group">
                <button onClick={this.setSampleData.bind(this)}>Sample Data</button>
              </div>

              <div className="form-group submit">
                <input type="submit" value="Save" />
              </div>
            </div>}
        </form>
      </section>
    );
  }
}

export { AppointmentForm, AppointmentsList };