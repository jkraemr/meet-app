import React, { Component } from 'react';
import Event from './Event';
import { Row, Col } from 'react-bootstrap';

class EventList extends Component {
  render() {
    const { events } = this.props;
    return (
      <Row className='EventList'>
        {events.map(event =>
          <Col key={event.id}>
            <Event event={event} />
          </Col>
        )}
      </Row>
    );
  }
}

export default EventList;