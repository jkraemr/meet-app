import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      collapseButton: 'Show Details',
    };
  }

  handleItemClicked = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      collapseButton: this.state.collapsed ? 'Hide Details' : 'Show Details'
    });
  };

  render() {

    const { event } = this.props;

    return (
      <div className='event'>
        <Card>
          <Card.Body>
            <Card.Title className='event-summary'>
              {event.summary}
            </Card.Title>
            <Card.Text className='event-start-dateTime'>
              {event.start.dateTime}
            </Card.Text>
            <Card.Text className='event-start-timeZone'>
              {event.start.timeZone}
            </Card.Text>
            <Card.Text className='event-location'>{event.location}</Card.Text>

            {!this.state.collapsed && (
              <div className='event-details'>
                <Card.Text className='event-description'>{event.description}</Card.Text>
                <Card.Link className='event-htmlLink' href={event.htmlLink}>
                  {event.htmlLink}
                </Card.Link>
              </div>
            )}

            <Button
              className='event-details-button'
              onClick={() => this.handleItemClicked()}
            >
              {this.state.collapseButton}{' '}
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Event;