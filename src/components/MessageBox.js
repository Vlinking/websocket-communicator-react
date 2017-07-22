import React, { Component } from 'react';


class MessageBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({messages: newProps.messages});
  }

  render() {
    return (
      <div className="Box">
        {
            this.props.messages.map((item, index) => (
                <div key={index}>{item.text}</div>
            ))
        }
      </div>
    );
  }
}

export default MessageBox;