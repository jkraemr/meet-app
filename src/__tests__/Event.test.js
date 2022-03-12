import React from 'react';
import Event from '../Event';
import { shallow } from 'enzyme';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {

  let EventWrapper, event;

  beforeAll(() => {
    event = mockData[0];
    EventWrapper = shallow(<Event event={event} />);
  });

  test('render event', () => {
    expect(EventWrapper.find('.event')).toHaveLength(1);
  });

  test('render event-summary', () => {
    expect(EventWrapper.find('.event-summary')).toHaveLength(1);
  });

  test('render event-summary valid data', () => {
    let eventSummary = event.summary;
    expect(EventWrapper.find('.event-summary').at(0).text()).toBe(eventSummary);
  });

  test('render event-start-dateTime', () => {
    expect(EventWrapper.find('.event-start-dateTime')).toHaveLength(1);
  });

  test('render event-start-dateTime valid data', () => {
    let eventStartDateTime = event.start.dateTime;
    expect(EventWrapper.find('.event-start-dateTime').at(0).text()).toBe(eventStartDateTime);
  });

  test('render event-start-timeZone', () => {
    expect(EventWrapper.find('.event-start-timeZone')).toHaveLength(1);
  });

  test('render event-start-timeZone valid data', () => {
    let eventStartTimeZone = event.start.timeZone;
    expect(EventWrapper.find('.event-start-timeZone').at(0).text()).toBe(eventStartTimeZone);
  });

  test('render event-location', () => {
    expect(EventWrapper.find('.event-location')).toHaveLength(1);
  });

  test('render event-location valid data', () => {
    let eventLocation = event.location;
    expect(EventWrapper.find('.event-location').at(0).text()).toBe(eventLocation);
  });

  // collapseButton

  test('render state collapsed to true by default', () => {
    expect(EventWrapper.state('collapsed')).toBe(true);
  });

  test('render details-button', () => {
    expect(EventWrapper.find('.event-details-button')).toHaveLength(1);
  });

  test('render event state collapsed to false after onClick details-button', () => {
    EventWrapper.setState({
      collapsed: true,
    });
    EventWrapper.find('.event-details-button').simulate('click');
    expect(EventWrapper.state('collapsed')).toBe(false);
  });

  test('render event state collapsed to true after onClick details-button', () => {
    EventWrapper.setState({
      collapsed: false,
    });
    EventWrapper.find('.event-details-button').simulate('click');
    expect(EventWrapper.state('collapsed')).toBe(true);
  });

  test('render details-button text to show details by default', () => {
    expect(EventWrapper.state('collapseButton')).toBe('Show Details');
  });

  test('render show-details-button text to hide details after onClick', () => {
    EventWrapper.setState({
      collapseButton: 'Show Details',
    });
    EventWrapper.find('.event-details-button').simulate('click');
    expect(EventWrapper.state('collapseButton')).toBe('Hide Details');
  });

  test('render less-details-button text to show details after onClick', () => {
    EventWrapper.setState({
      collapseButton: 'Less Details',
    });
    EventWrapper.find('.event-details-button').simulate('click');
    expect(EventWrapper.state('collapseButton')).toBe('Show Details');
  });

  test('render event-details collapsed by default', () => {
    expect(EventWrapper.find('.event-details')).toHaveLength(0);
  });

  test('render event-details collapsed by default', () => {
    EventWrapper.setState({
      collapsed: true,
    });
    EventWrapper.find('.event-details-button').simulate('click');
    expect(EventWrapper.find('.event-details')).toHaveLength(1);
  });

  // event-details

  test('render event-description', () => {
    expect(EventWrapper.find('.event-description')).toHaveLength(1);
  });

  test('render event-description valid data', () => {
    let eventDescription = event.description;
    expect(EventWrapper.find('.event-description').at(0).text()).toBe(eventDescription);
  });

  test('render event-htmlLink', () => {
    expect(EventWrapper.find('.event-htmlLink')).toHaveLength(1);
  });

  // test('render event-htmlLink valid data', () => {
  //   let eventCalendarLink = event.htmlLink;
  //   expect(EventWrapper.find('.event-htmlLink').at(0).text()).toBe(eventCalendarLink);
  // });

});