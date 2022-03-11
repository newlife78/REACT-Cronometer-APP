import React, { Component } from "react";
import "../App.css";

class Displays extends Component {
  render() {
    const {
      sessionLength,
      breakLength,
      timerType,
      timer,
      clockFormat,
      alarmStateStyle,
    } = this.props;
    return (
      <div id="displays">
        <div id="display-session">
          <label id="session-label">Session Length</label>
          <div id="session-length">{sessionLength}</div>
        </div>
        <div id="display-break">
          <label id="break-label">Break Length</label>
          <div id="break-length">{breakLength}</div>
        </div>
        <div id="display-clock">
          <div id="timer-clock" style={alarmStateStyle}>
            <label id="timer-label">{timerType}</label>
            <p id="time-left">{clockFormat(timer)}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Displays;
