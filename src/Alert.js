import React, { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
  }

  getStyle = () => {
    return {
      color: this.color,
      fontStyle: 'italic',
    };
  }

  render() {
    return (
      <div className='Alert'>
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'blue';
  }

  getStyle = () => {
    return {
      color: this.color,
      textDecorationLine: 'underline',
      textDecorationStyle: 'dotted',
    };
  }

}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'red';
  }

  getStyle = () => {
    return {
      color: this.color,
      textDecorationLine: 'underline',
      textDecorationStyle: 'dashed',
    };
  }

}

export { InfoAlert, ErrorAlert };