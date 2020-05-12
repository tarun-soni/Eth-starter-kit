import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3';
import './App.css';
import Tasks from '../abis/Tasks.json'


import TextField from '@material-ui/core/TextField';
class App extends Component {
  async componentWillMount() {
    //await this.loadWeb3()
    //await this.loadBlockchainData()
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
    // Load account
    const accounts = await new web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await new web3.eth.net.getId()
    const networkData = Tasks.networks[networkId]
    if (networkData) {
      const contract = new web3.eth.Contract(Tasks.abi, networkData.address)
      this.setState({ contract })
      const _task = await this.state.contract.methods.get().call()
      this.setState({ tasks: _task })
      console.log('tasks', this.state.tasks)
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
      inputString: ""
    }
  }

  updateInput(input) {
    this.setState({ inputString: input })
  }
    
  render() {
    return (


      <div>
        
        <div className="hero is-info">
          <div className="hero-body has-text-centered">
            <p className="title is-1">Ethereum Starter Kit</p>
          </div>
        </div><br></br>
        <div div className="top-container">
          <div className=" has-text-centered">
            <div className="form-div">
              <form onSubmit={() => { console.log('form submtt') }}>
                <TextField
                  id="outlined-basic" label="Insert Task" variant="outlined"
                  onChange={e => this.updateInput(e.target.value)}
                  value={this.state.inputString} />
              </form>
              <button className="button is-black"
                disabled={!this.state.inputString.length}
                onClick={() => {
                  console.log("Submit button pressed")
                  console.log('new Item', )
               
               return(
                 <p>{this.state.inputString}</p>
               )
                  // this.state.contract.methods.updateArray().send({ from: this.state.account }).then((r) => {

                  //   return this.setState({
                  //     inputTask: ''
                  //   })
                  // })
                }
                }> ADD  </button>
            </div></div></div>
      </div>
    );

  }
}



export default App;
