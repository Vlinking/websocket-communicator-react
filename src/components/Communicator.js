import React, { Component } from 'react';
import logo from '../images/logo.svg';
import icon from '../images/icon.png';
import MessageBox from './MessageBox';
import MessageInput from './MessageInput';
import '../css/App.css';


class Communicator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      notifications_supported: true,
      notifications_permission: ''
    };
  }

  handleNotification(message) {
    if (this.state.notifications_supported && (this.state.notifications_permission === "granted")) {
      var notification = new Notification("Message", {
        icon: icon,
        body: message,
      });
    }
  }

  componentDidMount() {
    this.connection = new WebSocket('ws://localhost:8765');
    this.connection.onmessage = evt => {
      this.setState({messages: this.state.messages.concat([{"text": evt.data}])});
      this.handleNotification(evt.data);
    };
    if (!Notification) {
      this.setState({notifications_supported: false});
      console.log("Your browser doesn't support desktop notifications.");
    } else {
        if (Notification.permission !== "granted") {
            console.log("Permissions not granted");
            Notification.requestPermission(permission => {
                this.setState({notifications_permission: permission});
                console.log("Notifications permissions level: " + permission);
            });
        } else {
            this.setState({notifications_permission: "granted"});
            console.log("Notifications permissions level granted from earlier.");
        }
    }
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
