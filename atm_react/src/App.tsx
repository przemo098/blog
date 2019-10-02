import React from "react";
import atm from "./atm.svg";
import "./App.css";
import AtmService from "./AtmService";
import WithdrawResultComponent, { IWithdrawResult } from "./WithdrawResultComponent";

interface AtmState {
  amountToWithdraw: number;
  withdrawResult: IWithdrawResult;
  isAmountCorrect: boolean;
}

class App extends React.Component<any, AtmState> {
  private _atmService: AtmService;
  constructor(props: any) {
    super(props);
    this._atmService = new AtmService();
    this.state = {
      amountToWithdraw: 0,
      withdrawResult: {},
      isAmountCorrect: true
    };
  }

  private withdraw(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this._atmService
    .getNotes(this.state.amountToWithdraw)
    .then(x => {
      if(x.status !==  200){
        this.setState({isAmountCorrect: false})
        return;
      }
      this.setState({isAmountCorrect: true})
      this.update(x.json())
    })
  }

  private update(response: Promise<any>){
    response.then(x => this.setState({withdrawResult: x}))
  }

  private handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    let amount = Number(e.target.value);
    if(!amount){
      this.setState({ amountToWithdraw: 0});
      return;
    }
    if (amount > 100000) {
      amount = 1000000;
    }
    this.setState({ amountToWithdraw: amount});
  }

  renderWithdrawResult(){
    if(this.state.isAmountCorrect)
      return <WithdrawResultComponent result={this.state.withdrawResult} />
    return <div className='withdrawResult'>Amount to withdraw is incorrect.</div>
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
              onChange={e => this.handleAmountChange(e)}
              value={this.state.amountToWithdraw}
            ></input>
            <input type="submit" value="Submit" />
          </div>
        </form> 
        {this.renderWithdrawResult()}
      </div>
    );
  }
}

export default App;
