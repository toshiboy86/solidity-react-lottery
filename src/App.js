import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {

  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    data: []
  }

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();

    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);


    this.setState({ manager, players, balance });

  }

  onSubmit = async (event) => {
    event.preventDefalut();
    const accounts = await web3.eth.getAccounts();

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });


  };

  render() {
    web3.eth.getAccounts().then(console.log);
    return (
      <div>
      <h2>Lottery Contract</h2>
      <p> { this.state.data[1] }This contract is managed by { this.state.manager }
          There are currently { this.state.players.length } people enter and
          competing to { web3.utils.fromWei(this.state.balance, 'ether') } win ether !
      </p>

      <hr />
      <form onSubmit={this.onSubmit}>
        <h4>want to try your luck ? </h4>
        <div>
          <label>Amout of ether to enter</label>
          <input
            value={this.state.value}
            onChange={event => this.setState({value: event.target.value })}
          />
        </div>
        <button>Enter</button>
      </form>
      </div>
    );
  }
}

export default App;
