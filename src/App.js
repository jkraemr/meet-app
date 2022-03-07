import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import { getEvents, extractLocations, checkToken } from './api';
import { NumberOfEvents } from './NumberOfEvents';

export class App extends Component {

  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentLocation: 'all',
  };

  async componentDidMount() {
    this.mounted = true;
    // testing
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) })
      }
    });
    // // online:
    // const accessToken = localStorage.getItem('access_token');
    // const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    // const searchParams = new URLSearchParams(window.location.search);
    // const code = searchParams.get('code');
    // if (code || (isTokenValid && this.mounted)) {
    //   getEvents().then((events) => {
    //     if (this.mounted) {
    //       this.setState({
    //         events: events.slice(0, this.state.numberOfEvents),
    //         locations: extractLocations(events)
    //       });
    //     }
    //   });
    // }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, eventCount = this.state.numberOfEvents) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all')
        ? events
        : events.filter((event) => event.location === location);
      if (this.mounted) {
        this.setState({
          events: locationEvents.slice(0, eventCount),
          location: location,
          currentLocation: location
        });
      }
    });
  };

  updateNumberOfEvents = async (e) => {
    const newNumber = e.target.value ? parseInt(e.target.value) : 50;
    if (newNumber <= 0 || newNumber > 50) {
      await this.setState({
        numberOfEvents: newNumber,
        errorAlert: 'Please set a number between 1 and 50'
      });
    } else {
      await this.setState({
        errorAlert: '',
        numberOfEvents: newNumber
      });
      this.updateEvents(this.state.currentLocation, this.state.numberOfEvents);
    }
  };

  render() {
    return (
      <div className='App'>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents
          numberOfEvents={this.state.numberOfEvents}
          updateNumberOfEvents={this.updateNumberOfEvents}
          errorAlert={this.state.errorAlert} />
        <EventList events={this.state.events} />

      </div>
    );
  }
}

export default App;