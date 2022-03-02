import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import { mockData } from '../mock-data';
import { loadFeature, defineFeature } from 'jest-cucumber';
import CitySearch from '../CitySearch';
import { extractLocations } from "../api";

const feature = loadFeature('./src/features/filterEventsByCity.feature');

const locations = extractLocations(mockData);

defineFeature(feature, test => {

  test('When user has not searched for a city, show upcoming events from all cities', ({ given, when, then }) => {

    let AppWrapper;

    given('user has not searched for a city', () => {

    });

    when('user opens the app', () => {
      AppWrapper = mount(<App />);
    });

    then('user should see a list of upcoming events from around the world', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
    });

  });


  test('User should see a list of suggestions when they search for a city', ({ given, when, then }) => {

    let CitySearchWrapper;

    given('the main page is open', () => {
      CitySearchWrapper = shallow(<CitySearch updateEvents={() => { }} locations={locations} />);

    });

    when('user starts typing in the city textbox', () => {
      CitySearchWrapper.find('.city').simulate('change', { target: { value: 'Berlin' } });
    });

    then('user should receive a list of cities (suggestions) that match what they have typed', () => {
      expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(2);
    });

  });


  test('User can select a city from the suggested list', ({ given, and, when, then }) => {

    let AppWrapper;

    given('user was typing “Berlin” in the city textbox', async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.find('.city').simulate('change', { target: { value: 'Berlin' } });
    });

    and('the list of suggested cities is showing', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.suggestions li')).toHaveLength(2);
    });

    when('user selects a city (e.g., “Berlin, Germany”) from the list', () => {
      AppWrapper.find('.suggestions li').at(0).simulate('click');
    });

    then('their city should be changed to that city (i.e., “Berlin, Germany”)', () => {
      const CitySearchWrapper = AppWrapper.find(CitySearch);
      expect(CitySearchWrapper.state('query')).toBe('Berlin, Germany');
    });

    and('user should receive a list of upcoming events in that city', () => {
      expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
    });

  });

});