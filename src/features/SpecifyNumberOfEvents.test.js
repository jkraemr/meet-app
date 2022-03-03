import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { NumberOfEvents } from '../NumberOfEvents';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {

  test('When user has not specified a number, 32 is the default number', ({ given, when, then }) => {

    given('the event list was loaded', () => { });
    let NumberOfEventsWrapper;

    when('user does not interact with -amount of events- selection feature/function',
      () => { NumberOfEventsWrapper = shallow(<NumberOfEvents />); });

    then('32 events shall be listed per default', () => {
      NumberOfEventsWrapper.setState({ numberOfEvents: 32 });
    });

  });


  test('User can change the number of events they want to see', ({ given, when, then }) => {

    let AppWrapper;

    given('the event list was loaded', () => { AppWrapper = mount(<App />); });

    when('user wants to adjust the amount of shown events and selects respective feature/function', () => {
      const eventNumberInput = { target: { value: 6 } };
      AppWrapper.find('.NumberOfEvents').simulate(
        'change',
        eventNumberInput
      );
    });

    then('the amount of events shown in the list shall be adjusted to the selected number', () => {
      const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      NumberOfEventsWrapper.setState({ numberOfEvents: 6 });
      expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(6);
    });

  });

});