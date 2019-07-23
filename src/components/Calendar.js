import React, { Component } from "react";
import dateFns from "date-fns";
import classNames from "classnames";

import "../assets/css/Calendar.css";
import Input from "./Input";

// Helpers
const getDaysForCalendar = (date = new Date(), calendarSize = 42) => {
  const visibleCalendarDays = [];
  const monthStartDate = dateFns.startOfMonth(date);
  const monthEndDate = dateFns.endOfMonth(date);
  const monthStartDayOfWeek = monthStartDate.getDay();
  const daysInMonth = dateFns.getDaysInMonth(date);
  const numOfDaysToAddBefore = monthStartDayOfWeek - 1;
  const calendarStartDate = dateFns.subDays(
    monthStartDate,
    numOfDaysToAddBefore
  );
  const calendarEndDate = dateFns.addDays(
    monthEndDate,
    calendarSize - daysInMonth - numOfDaysToAddBefore
  );

  dateFns
    .eachDay(calendarStartDate, calendarEndDate)
    .forEach(date => visibleCalendarDays.push(date));

  return visibleCalendarDays;
};

const getDaysByWeek = (days = []) => {
  const DAYS_IN_WEEK = 7;
  const result = [];
  let weekOfDays = [];

  days.forEach(day => {
    if (weekOfDays.length === DAYS_IN_WEEK) {
      result.push(weekOfDays);
      weekOfDays = [];
    }

    weekOfDays.push(day);
  });

  result.push(weekOfDays);
  return result;
};

const getMonthAsWord = date => date.toString().split(" ")[1];

// View
class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = { date: props.date };
  }

  addMonth = () =>
    this.setState({ date: dateFns.addMonths(this.state.date, 1) });
  subMonth = () =>
    this.setState({ date: dateFns.subMonths(this.state.date, 1) });
  addYear = () => this.setState({ date: dateFns.addYears(this.state.date, 1) });
  subYear = () => this.setState({ date: dateFns.subYears(this.state.date, 1) });
  showCurrentDate = () => this.setState({ date: new Date() });

  renderControls() {
    const { date } = this.state;
    return (
      <div className="calendar__controls-row">
        <div className="calendar__controls">
          <i class="material-icons" onClick={this.subYear}>
            fast_rewind
          </i>
          <i class="material-icons" onClick={this.subMonth}>
            arrow_left
          </i>
        </div>
        <div
          className="calendar__month-with-year"
          onClick={this.showCurrentDate}
        >
          {getMonthAsWord(date)} {date.getFullYear()}
        </div>
        <div className="calendar__controls">
          <i class="material-icons" onClick={this.addMonth}>
            arrow_right
          </i>
          <i class="material-icons" onClick={this.addYear}>
            fast_forward
          </i>
        </div>
      </div>
    );
  }

  renderDaysOfWeek() {
    return (
      <div className="calendar__days-of-week">
        {["M", "T", "W", "T", "F", "S", "S"].map((letter, i) => (
          <div className="calendar__day-of-week" key={i}>
            {letter}
          </div>
        ))}
      </div>
    );
  }

  renderDate(date) {
    return (
      <div
        className={classNames("calendar__day", {
          "calendar__day--pale": !dateFns.isSameMonth(date, this.state.date),
          "calendar__day--emphasize": dateFns.isToday(date)
        })}
        onClick={() => this.props.onDatePick(date)}
        key={date}
      >
        {date.getDate()}
      </div>
    );
  }

  render() {
    const weeksWithDaysInside = getDaysByWeek(
      getDaysForCalendar(this.state.date)
    );

    return (
      <div className={classNames("calendar", this.props.className)}>
        {this.renderControls()}
        {this.renderDaysOfWeek()}
        {weeksWithDaysInside.map((week, i) => (
          <div className="calendar__week" key={i}>
            {week.map(this.renderDate, this)}
          </div>
        ))}
      </div>
    );
  }
}

class DatePicker extends Component {
  static defaultProps = {
    dateFormat: "DD.MM.YYYY"
  };

  constructor() {
    super();

    this.state = {
      isCalendarOpen: false,
      selectedDate: null
    };
  }

  handleClick = event => {
    event.preventDefault();
    event.target.blur();
    this.setState({ isCalendarOpen: !this.state.isCalendarOpen });
  };

  handleDatePick = date => {
    this.setState({
      isCalendarOpen: false,
      selectedDate: date
    });
    this.props.onDatePick(date);
  };

  render() {
    const { onDatePick, dateFormat } = this.props;
    const { isCalendarOpen, selectedDate } = this.state;

    return (
      <div className="date-picker">
        <div className="date-picker__date-selection" onClick={this.handleClick}>
          <i className="far fa-calendar-alt" />
          {/* <input
            className="date-picker__input"
            type="text"
            placeholder="Select Date"
            value={selectedDate && dateFns.format(selectedDate, dateFormat)}
          /> */}
          <Input placeholder="Select Date" label="Date" />
        </div>
        {isCalendarOpen && (
          <Calendar
            className="date-picker__calendar"
            date={selectedDate || new Date()}
            onDatePick={this.handleDatePick}
          />
        )}
      </div>
    );
  }
}

export default DatePicker;
