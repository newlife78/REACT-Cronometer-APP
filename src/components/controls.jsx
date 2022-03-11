import React, { Component } from "react";
import "../App.css";

class Controls extends Component {
  render() {
    const { timerState, timerControl, handleStop, handleReset } = this.props;
    let iconType =
      timerState === "stopped"
        ? "fa-solid fa-circle-play"
        : "fa-solid fa-circle-pause";
    return (
      <div id="container-controls">
        <button id="start_stop" onClick={timerControl}>
          <i className={iconType}></i>
        </button>
        <button id="stop" onClick={handleStop}>
          <i className="fa-solid fa-circle-stop"></i>
        </button>
        <button id="reset" onClick={handleReset}>
          <i className="fa-solid fa-arrows-rotate"></i>
        </button>
      </div>
    );
  }
}

export default Controls;
