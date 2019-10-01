import React from "react";
import atm from "./atm.svg";
import "./App.css";

class App extends React.Component<any, any> {
  render() {
    return (
      <div className='atm'>
        <img src={atm} className="image" alt="logo" />
        <label htmlFor='amountToWidthDraw'>Amount to withdraw:</label>
        <input id='amountToWidthDraw'></input>
      </div>
    );
  }
}

export default App;
