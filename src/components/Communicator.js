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

  componentDidMount() {
    this.connection = new WebSocket('ws://localhost:8765');
    this.connection.onmessage = evt => {
      this.setState({messages: this.state.messages.concat([{"text": evt.data}])});
    };
  }

  handleInputCallback(message) {
    this.connection.send(message);
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
