import React, { Component } from 'react';
const uniqid = require('uniquid');
const moment = require('moment');


class Calendar extends Component {

  handleButtonClick = e => {
    this.props.onTraversal(e.currentTarget.dataset.action);
  }

  handleDayClick = (date) => {
    /* console.group('class-->', 'Calendar');
    console.log('this.props.date-->', date);
    console.groupEnd(); */
    this.props.onDayClick(date);
  }

  render() {
    const my = this.props.data.range[1].my;
    const date = my;
    const dateArray = date.split('-');
    const year = dateArray[0];
    const monthIndex = dateArray[1] - 1;

    const currentMonth = {
      from: moment([year, monthIndex, 1]).format('YYYY-MM-DD'),
      to: moment([year, monthIndex, 1]).endOf('month').format('YYYY-MM-DD'),
    };

    let appsOfTheMonth = {};

    // console.info(currentMonth);

    for (const date in this.props.appointments) {
      // console.group('apps');
      // console.log('date-->', date);
      // console.log('currentMonth.from-->', currentMonth.from);
      // console.log('currentMonth.to-->', currentMonth.to);
      // console.groupEnd();

      const appDate = moment(date);

      if (appDate.isBetween(currentMonth.from, currentMonth.to, null, "[]")) {
        if (this.props.appointments.hasOwnProperty(date)) {
          appsOfTheMonth[date] = this.props.appointments[date];
        }
      }
    }

    return (
      <section>
        <div className="cal-traverser">
          <button onClick={this.handleButtonClick.bind(this)} data-action={-1}>&lt;</button>
          <button onClick={this.handleButtonClick.bind(this)} data-action={0}>{this.props.data.range[1].mS}</button>
          <button onClick={this.handleButtonClick.bind(this)} data-action={1}>&gt;</button>
        </div>
        <table className="calendar--table">
          <thead>
            <tr>
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
          </thead>
          <tbody>
            <Month
              key={uniqid()}
              my={my}
              appointments={appsOfTheMonth}
              onDayClick={this.handleDayClick.bind(this)}
              active={this.props.active}
            />
          </tbody>
        </table>
      </section>
    );
  }
}

class Month extends Component {
  handleDayClick = (date) => {
    /* console.group('class-->', 'Month');
    console.log('date-->', date);
    console.groupEnd(); */
    this.props.onDayClick(date);
  }

  render() {
    const date = this.props.my;
    const dateArray = date.split('-');
    const year = dateArray[0];
    const monthIndex = dateArray[1] - 1;
    const startDate = moment([year, monthIndex]);
    const endOfMonth = moment(startDate).endOf('month');

    const currentMonth = {
      from: moment([year, monthIndex, 1]).format('YYYY-MM-DD'),
      to: moment([year, monthIndex, 1]).endOf('month').format('YYYY-MM-DD'),
    };

    const today = moment().format('YYYY-MM-DD');

    /* Adjust startDate
     * to accomodate days before that start of month.
     * so it won't look empty
     * See Dec 2018
     * ----------------- */
    const dayOfWeek = startDate.clone().day();
    if (dayOfWeek > 0) {
      startDate.subtract(dayOfWeek, 'd');
    }

    /* Adjust endOfMonth
     * to accomodate days after that month
     * so it won't look empty
     * See Dec 2018
     * ----------------- */
    const eomExtender = 36 - Math.abs(startDate.diff(endOfMonth, 'd'));
    endOfMonth.add(eomExtender, 'd');

    let weeks = [];
    while (startDate.isSameOrBefore(endOfMonth)) {
      let week = [];

      for (let i = 0; i < 7; i++) {
        const date = startDate.clone().add(i, 'd');
        const appsOfTheDay = [];

        for (const key in this.props.appointments) {
          const appDate = moment(key);

          if (Math.abs(appDate.diff(date, 'd')) === 0) {
            if (this.props.appointments.hasOwnProperty(key)) {
              appsOfTheDay.push(this.props.appointments[key]);
            }
          }
        }

        week.push(
          <Day
            key={uniqid()}
            date={date}
            isToday={Math.abs(date.diff(today, 'd')) === 0}
            isActive={date.isBetween(currentMonth.from, currentMonth.to, null, "[]")}
            isClicked={Math.abs(date.diff(this.props.active.date, 'd')) === 0}
            appontments={appsOfTheDay}
            onDayClick={this.handleDayClick.bind(this)}
          />);
      }

      weeks.push(<Week key={uniqid()} days={week} />);
      startDate.add(7, 'd');
    }

    return (<>{weeks}</>);
  }
}

class Week extends Component {
  render() {
    return <tr className="week">{this.props.days}</tr>;
  }
}

class Day extends Component {
  handleDayClick = () => {
    /* console.group('class-->', 'Day');
    console.log('this.props.date-->', this.props.date.format('YYYY-MM-DD'));
    console.groupEnd(); */
    this.props.onDayClick(this.props.date.format('YYYY-MM-DD'));
  }

  render() {
    return (
      <td
        refs="td"
        className={`day 
        ${this.props.isActive || 'inactive'} 
        ${this.props.isToday && 'today'}
        ${this.props.isClicked && 'clicked'}
        `}
        onClick={this.handleDayClick.bind(this)}>
        {moment(this.props.date).format('DD')}
        {this.props.appontments.length > 0 && <i className="day--appointment"></i>}
      </td>
    );
  }
}

export default Calendar;