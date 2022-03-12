import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

export class NumberOfEvents extends Component {

  render() {
    return (
      <div className='NumberOfEvents'>
        <label className='numbersearch-label' for='name'>&#9989; Number of events:</label>
        <br></br>
        <input
          name='name'
          type='number'
          className='number'
          min='0'
          max='51'
          value={this.props.numberOfEvents}
          onChange={(e) => this.props.updateNumberOfEvents(e)} />
        <ErrorAlert text={this.props.errorAlert} />
      </div>
    )
  }
};