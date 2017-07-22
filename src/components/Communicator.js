import React, { Component } from 'react';
import logo from '../images/logo.svg';
import MessageBox from './MessageBox';
import MessageInput from './MessageInput';
import '../css/App.css';


class Communicator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  handleInputCallback(message) {
    //console.log('We received ' + message);
    this.setState({messages: this.state.messages.concat([{"text": message}])});
    //console.log(this.state.messages)
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Communicator</h2>
        </div>
        <p className="App-intro">
        <MessageBox
          messages={this.state.messages}
        />
        <MessageInput
          callbackFunction={this.handleInputCallback.bind(this)}
        />
        </p>
      </div>
    );
  }
}

export default Communicator;
