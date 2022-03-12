import React, { Component } from 'react';
import EventList from './EventList';
import CitySearch from './CitySearch';
import WelcomeScreen from './WelcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import { EventGenre } from './EventGenre';
import { NumberOfEvents } from './NumberOfEvents';
import { WarningAlert } from './Alert';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import './App.css';
import './nprogress.css';

export class App extends Component {

  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentLocation: 'all',
    showWelcomeScreen: undefined
  };

  async componentDidMount() {
    this.mounted = true;

    // Online live mode with API access 
    if (navigator.onLine && !window.location.href.startsWith('http://localhost')) {
      const accessToken = localStorage.getItem('access_token');
      const isTokenValid = (await checkToken(accessToken)).error ? false : true;
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get('code');
      this.setState({ showWelcomeScreen: !(code || isTokenValid) });
      if ((code || isTokenValid) && this.mounted) {
        getEvents().then((events) => {
          if (this.mounted) {
            this.setState({
              events: events.slice(0, this.state.numberOfEvents),
              locations: extractLocations(events),
            });
          }
        });
      }
    }

    // Offline test mode with localStorage access
    else {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) })
        }
      });
    }

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

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return { city, number };
    })
    return data;
  };

  render() {

    const logo = require('./logo_transparent.webp');

    const refreshPage = () => {
      window.location.reload();
    }

    if (this.state.showWelcomeScreen === undefined &&
      navigator.onLine && !window.location.href.startsWith('http://localhost')
    ) {
      return <div className='App' />;
    }
    if (this.state.showWelcomeScreen === true)
      return (
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      );

    return (
      <div className='App'>
        <Navbar sticky='top' bg='dark' variant='dark' expand='md'>
          <Container fluid>
            <Navbar.Brand onClick={refreshPage} style={{ cursor: 'pointer' }}>
              <img
                alt=''
                src={logo}
                width='30'
                height='30'
                className='d-inline-block align-top'
              />{' '}
              meetFS
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className='justify-content-end'>
              <Navbar.Text>
                Worldwide Events for Full-Stack Web Developers. Made with
                &#9825; by <a href='https://github.com/jkraemr/meet-app' target='_blank'>jkraemr</a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className='body'>
          {!navigator.onLine ? (<WarningAlert style={{ textAlign: 'center' }} text='++ Offline Mode (only cached data are being shown) ++' />) : (<WarningAlert text='' />)}
          <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
          <NumberOfEvents
            numberOfEvents={this.state.numberOfEvents}
            updateNumberOfEvents={this.updateNumberOfEvents}
            errorAlert={this.state.errorAlert} />
          <div className='data-vis-wrapper'>
            <EventGenre events={this.state.events} />
            <ResponsiveContainer height={400}>
              <ScatterChart
                margin={{
                  top: 20, right: 20, bottom: 20, left: 20,
                }}
                strokeWidth={1}
              >
                <CartesianGrid stroke='#F8DB5C' />
                <XAxis strokeWidth={1.5} stroke='#F8DB5C' type='category' dataKey='city' name='City' />
                <YAxis strokeWidth={1.5} stroke='#F8DB5C' type='number' dataKey='number' name='Number of Events' />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={this.getData()} fill='#FF9670' />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <br></br>
          <Container fluid>
            <Row>
              <Col xs={12}>
                <EventList events={this.state.events} />
              </Col>
            </Row>
          </Container>
          <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
            getAccessToken={() => { getAccessToken() }} />
        </div>
      </div>
    );
  }
}

export default App;