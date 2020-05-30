import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3';
import './App.css';
import Tasks from '../abis/Tasks.json'
import '../assets/main.css'

import TextField from '@material-ui/core/TextField';
import Nav from './Nav';
class App extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  async loadBlockchainData() {
    const web3 = window.web3
    const web3CurrentProvider = window.web3.currentProvider

    console.log('window web3',web3CurrentProvider)
    // Load account
    const accounts = await new web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId= await new web3.eth.net.getId()

    console.log('netID',networkId)

    const networkData = Tasks.networks[networkId]

    console.log('netdata',networkData)
/**
 * 
 * 
 * 
 * 
 * else if (provider) {
    const LoadProvider = new Web3.providers.HttpProvider(
      provider
    );
    const web3 = new Web3(LoadProvider);
    return (web3);
  } 
 */
    if (networkData) {
      const contract = new web3.eth.Contract(Tasks.abi, networkData.address)
      this.setState({ contract })
      const _task = await this.state.contract.methods.get().call()
      this.setState({ displayingString: _task })
      console.log('tasks', this.state.displayingString)
    }
    else {
      window.alert('Smart contract not deployed to detected network.')
    }
    console.log('current logged in account ', this.state.account)
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: '',
      inputString: "",
      displayingString:''
    }
  }

  updateInput(input) {
    this.setState({ inputString: input })
  }
    
  render() {
    return (

      <div className=" bg-gray-200">
        
        
<Nav/>
          <div className="w-1/3 p-2 bg-gray-200">

          <p className="w-1/3 p-2 title">Ethereum Starter Kit</p>
            <h3>Current account <br></br> {this.state.account}</h3>
            <br/><br/>
            <div className="form-div ">
              <form onSubmit={() => { console.log('form submtt') }}>
                <TextField
                  id="outlined-basic" label="Insert Text" variant="outlined"
                  onChange={e => this.updateInput(e.target.value)}
                  value={this.state.inputString} />
              </form>
              <br/>
              <button className="button"
                disabled={!this.state.inputString.length}
                onClick={() => {
                  console.log("Submit button pressed")

                  this.setState({displayingString: this.state.inputString})
                  this.state.contract.methods.set(this.state.inputString).send({ from: this.state.account }).then((r) => {

                    return this.setState({
                      
                    })
                  })
                }
                }> ADD 
                </button>
                <br/>
                
                <p>{this.state.displayingString}</p>
                
            </div></div>
      </div>
    );

  }
}

export default App;
