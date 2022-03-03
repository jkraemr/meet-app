import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {

  let AppWrapper;

  test('An event element is collapsed by default', ({ given, when, then }) => {

    given('the event list was loaded', async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.update();
    });

    when('user does not interact with shown event items', () => {

    });

    then('all event items shall be collapsed', () => {
      expect(AppWrapper.find('.event-details')).toHaveLength(0);
    });

  });


  test('User can expand an event to see its details', ({ given, when, then }) => {

    given('the event list was loaded and shows at least a selection of collapsed event items', async () => {
      AppWrapper = await mount(<App />);
    });

    when('user clicks on single event item to get more information', () => {
      AppWrapper.update();
      AppWrapper.find('.event-details-button').at(0).simulate('click');
    });

    then('the event detail view shall be expanded', () => {
      expect(AppWrapper.find('.event-details')).toHaveLength(1);
    });

  });


  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    given('an event detail view was loaded', async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.update();
      AppWrapper.find('.event-details-button').at(0).simulate('click');
      expect(AppWrapper.find('.event-details')).toHaveLength(1);
    });

    when('user gives the command to hide the currently shown event detail view', () => {
      AppWrapper.find('.event-details-button').at(0).simulate('click');
    });

    then('the event detail view shall be closed', () => {
      expect(AppWrapper.find('.event-details')).toHaveLength(0);
    });

  });

});