import React from "react";
import atm from "./atm.svg";
import "./App.css";
import AtmService from "./AtmService";
import WithdrawResultComponent, { IWithdrawResult } from "./WithdrawResultComponent";

interface AtmState {
  amountToWithdraw: number;
  withdrawResult: IWithdrawResult;
}

class App extends React.Component<any, AtmState> {
  private _atmService: AtmService;
  constructor(props: any) {
    super(props);
    this._atmService = new AtmService();
    this.state = {
      amountToWithdraw: 0,
      withdrawResult: {}
    };
  }

  private withdraw(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this._atmService
    .getNotes(this.state.amountToWithdraw)
    .then(x => this.update(x.json()))
  }

  private update(response: Promise<any>){
    response.then(x => this.setState({withdrawResult: x}))
  }

  private handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    let amount = Number(e.target.value);
    if (amount > 100000) {
      amount = 1000000;
    }
    this.setState({ amountToWithdraw: amount,
     });
  }

  render() {
    return (
      <div className="atm">
        <form onSubmit={x => this.withdraw(x)}>
          <img src={atm} className="image" alt="logo" />
          <label htmlFor="amountToWidthDraw">Amount to withdraw:</label>
          <div className="atmSubmit">
            <input
              className="amountToWithdraw"
              id="amountToWidthDraw"
              min="0"
              max="100000"
              onChange={e => this.handleAmountChange(e)}
              type="number"
              value={this.state.amountToWithdraw}
            ></input>
            <input type="submit" value="Submit" />
          </div>
        </form> 
        <WithdrawResultComponent result={this.state.withdrawResult} />
      </div>
    );
  }
}

// dupa={{20: 20, 30: 1}}
export default App;
