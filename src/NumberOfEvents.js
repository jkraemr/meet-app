import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

export class NumberOfEvents extends Component {

  render() {
    return (
      <div className='NumberOfEvents'>
        <ErrorAlert text={this.props.errorAlert} />
        <input
          type='number'
          className='number'
          min='0'
          max='51'
          value={this.props.numberOfEvents}
          onChange={(e) => this.props.updateNumberOfEvents(e)} />
      </div>

    )
  }
};