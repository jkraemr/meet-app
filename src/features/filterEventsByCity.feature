Feature: Filter events by city

Scenario: When user has not searched for a city, show upcoming events from all cities
Given user has not searched for a city
When user opens the app
Then user should see a list of upcoming events from around the world

Scenario: User should see a list of suggestions when they search for a city
Given the main page is open
When user starts typing in the city textbox
Then user should receive a list of cities (suggestions) that match what they have typed

Scenario: User can select a city from the suggested list
Given user was typing “Berlin” in the city textbox 
And the list of suggested cities is showing
When user selects a city (e.g., “Berlin, Germany”) from the list
Then their city should be changed to that city (i.e., “Berlin, Germany”)
And user should receive a list of upcoming events in that city