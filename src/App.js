import React, { Component } from "react";
import Buttons from "./components/buttons";
import Displays from "./components/displays";
import Controls from "./components/controls";
import "./App.css";

const buttons = [
  {
    id: "session-increment",
    onClickFunc: "handleLengthTime",
    value: "+",
  },
  {
    id: "session-decrement",
    onClickFunc: "handleLengthTime",
    value: "-",
  },
  {
    id: "break-increment",
    onClickFunc: "handleLengthTime",
    value: "+",
  },
  {
    id: "break-decrement",
    onClickFunc: "handleLengthTime",
    value: "-",
  },
];

const alarmOff = {
  color: "#fff",
  border: "2px solid #ee7511",
};

const alarmOn = {
  color: "#ff0000",
  border: "2px solid #ff0000",
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLength: 25,
      breakLength: 5,
      timerState: "stopped",
      timerType: "Session",
      timer: 1500,
      timerInterval: "",
      alarmState: alarmOff,
    };
    this.handleLengthTime = this.handleLengthTime.bind(this);
    this.countDown = this.countDown.bind(this);
    //this.clockifyCountDown = this.clockifyCountDown.bind(this);
    this.timerControl = this.timerControl.bind(this);
    this.alarm = this.alarm.bind(this);
    this.timerPhaseControl = this.timerPhaseControl.bind(this);
    this.clockFormat = this.clockFormat.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleLengthTime(event) {
    // 'event.currentTarget' vs 'event.target':
    // See: https://www.youtube.com/watch?v=SpatM1W5wRQ
    // See: https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget
    // 'event.currentTarget': is interesting to use when attaching the same event handler to several elements
    // 'event.target': interesting to use to only the element that was clicked
    const { timerState, timerType, sessionLength, breakLength, timer } =
      this.state;
    if (timerState === "stopped") {
      let stateToUpdate =
        event.target.id === "session-increment" ||
        event.target.id === "session-decrement"
          ? "sessionLength"
          : "breakLength";
      let time =
        timerType === "Session" && stateToUpdate === "sessionLength"
          ? sessionLength
          : timerType === "Break" && stateToUpdate === "breakLength"
          ? breakLength
          : timer;
      if (event.target.value === "+" && this.state[stateToUpdate] !== 60) {
        time = time === timer ? timer : time * 60 + 60;
        this.setState({
          [stateToUpdate]: this.state[stateToUpdate] + 1,
          timer: time,
        });
      } else if (
        event.target.value === "-" &&
        this.state[stateToUpdate] !== 1
      ) {
        time = time === timer ? timer : time * 60 - 60;
        this.setState({
          [stateToUpdate]: this.state[stateToUpdate] - 1,
          timer: time,
        });
      }
    }
  }

  // See: recursion 'https://www.youtube.com/watch?v=6oDQaB2one8'
  //countDown(fn, time) //'time' period before executing 'fn'
  countDown() {
    this.setState({
      timer: this.state.timer - 1,
    });
  }

  // Extra function for countDown using 'Date().getTime()'
  //clockifyCountDown() {
  //  let currDateTime = new Date().getTime();
  //  let newCurrDateTime = currDateTime + this.countDown();
  //  let timerClock = newCurrDateTime - currDateTime;
  //  this.clockFormat(timerClock);
  //}

  alarm(time) {
    // alarm sound
    if (time === 0) {
      this.audioBeep.currentTime = 0;
      this.audioBeep.play();
    }
    // alarm color
    else if (time <= 60) {
      this.setState({
        alarmState: alarmOn,
      });
    } else {
      this.setState({
        alarmState: alarmOff,
      });
    }
  }

  timerPhaseControl() {
    const { sessionLength, breakLength, timerType, timer } = this.state;
    this.alarm(timer);
    if (timerType === "Session" && timer === 0) {
      this.setState({
        timerType: "Break",
        timer: breakLength * 60,
      });
    } else if (timerType === "Break" && timer === 0) {
      this.setState({
        timerType: "Session",
        timer: sessionLength * 60,
      });
    }
  }

  timerControl() {
    //See: 'setInterval' & 'clearInterval'
    // https://www.youtube.com/watch?v=rBpRtu7GgpQ
    // https://www.youtube.com/watch?v=CqDqHiamRHA
    let { timerState, timerInterval } = this.state;
    if (timerState === "stopped") {
      timerInterval = setInterval(() => {
        this.countDown();
        this.timerPhaseControl();
      }, 1000);
      this.setState({
        timerState: "running",
        timerInterval: timerInterval,
      });
    } else {
      clearInterval(timerInterval);
      this.audioBeep.pause();
      this.audioBeep.currentTime = 0;
      this.setState({ timerState: "stopped", timerInterval: "" });
    }
  }

  clockFormat(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return minutes + ":" + seconds;
  }

  handleStop() {
    clearInterval(this.state.timerInterval);
    //const audioBeep = document.getElementById("beep");
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
    this.setState({
      timerState: "stopped",
      timerInterval: "",
    });
  }

  handleReset() {
    clearInterval(this.state.timerInterval);
    //const audioBeep = document.getElementById("beep");
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
    this.setState({
      sessionLength: 25,
      breakLength: 5,
      timerState: "stopped",
      timerType: "Session",
      timer: 1500,
      timerInterval: "",
      alarmState: alarmOff,
    });
  }

  render() {
    return (
      <div id="container-main">
        <div id="container-cronometer">
          <div id="cronometer-border">
            <div id="cronometer">
              <Displays
                sessionLength={this.state.sessionLength}
                breakLength={this.state.breakLength}
                timerType={this.state.timerType}
                timer={this.state.timer}
                clockFormat={this.clockFormat}
                alarmStateStyle={this.state.alarmState}
              />
              <Controls
                timerState={this.state.timerState}
                timerControl={this.timerControl}
                handleStop={this.handleStop}
                handleReset={this.handleReset}
              />
              <audio
                id="beep"
                preload="auto"
                ref={(audio) => (this.audioBeep = audio)}
                src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
              />
            </div>
          </div>
          <Buttons buttons={buttons} handleLengthTime={this.handleLengthTime} />
        </div>
        <footer>
          <a href="https://codepen.io/new_life/full/wvebydP" target="_blank">
            &copy; Developed by Paulo Fidalgo
          </a>
        </footer>
      </div>
    );
  }
}

export default App;
