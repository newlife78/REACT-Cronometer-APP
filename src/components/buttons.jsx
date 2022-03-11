import React, { Component } from "react";
import "../App.css";

class Buttons extends Component {
  render() {
    const { buttons } = this.props;
    return (
      <div id="container-buttons">
        {buttons.map((button) => (
          <button
            key={button.id}
            id={button.id}
            onClick={this.props[button.onClickFunc]}
            value={button.value}
          >
            {button.value}
          </button>
        ))}
      </div>
    );
  }
}
export default Buttons;

//      <div id="container-buttons">
//        {buttons.map((button) => (
//          <button key={button.id} id={button.id} value={button.value}></button>
//        ))}
//      </div>;
