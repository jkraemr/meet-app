# Meet App

The **meetFS App** is a serverless, progressive web application (PWA) built with React using test-driven (TDD) and behaviour-driven (BDD) development methods. The application uses the Google Calendar API to fetch upcoming events for full-stack web developers.

## Key Features

* Filter events by city
* Show/hide event details
* Specify number of events
* Use the app when offline
* Add an app shortcut to the home screen
* View a chart showing the number of upcoming events by city

## Details

### Feature 1: Filter events by city

**User story:** As a user, I should be able to filter events by city so that I can see a list of events that take place in that city.

**Scenario 1:**
When user has not searched for a city, show upcoming events from all cities
* **Given** user has not searched for a city
* **When** user opens the app
* **Then** user should see a list of upcoming events from around the world

**Scenario 2:**
User should see a list of suggestions when they search for a city
* **Given** the main page is open
* **When** user starts typing in the city textbox
* **Then** user should receive a list of cities (suggestions) that match what they have typed

**Scenario 3:**
User can select a city from the suggested list
* **Given** user was typing “Berlin” in the city textbox
* **And** the list of suggested cities is showing
* **When** user selects a city (e.g., “Berlin, Germany”) from the list
* **Then** their city should be changed to that city (i.e., “Berlin, Germany”)
* **And** user should receive a list of upcoming events in that city

### Feature 2: Show or hide event details

**User story:** As a user, I should be able to show / hide event details so that I can get more information about a specific event or return to the overview list.

**Scenario 1:**
An event element is collapsed by default
* **Given** the event list was loaded
* **When** user does not interact with shown event items
* **Then** all event items shall be collapsed

**Scenario 2:**
User can expand an event to see its details
* **Given** the event list was loaded and shows at least a selection of collapsed event items 
* **When** user clicks on single event item to get more information
* **Then** the event detail view shall be expanded

**Scenario 3:** 
User can collapse an event to hide its details
* **Given** an event detail view was loaded
* **When** user gives the command to hide the currently shown event detail view
* **Then** the event detail view shall be closed

### Feature 3: Specify number of events

**User story:** As a user, I should be able to specify the number of shown events
so that I can choose the amount of events shown in the overview list at once.

**Scenario 1:**
When user has not specified a number, 32 is the default number

* **Given** the event list was loaded
* **When** user does not interact with -amount of events- selection feature/function
* **Then** 32 events shall be listed per default

**Scenario 2:**
User can change the number of events they want to see

* **Given** the event list was loaded
* **When** user wants to adjust the amount of shown events and selects respective feature/function
* **Then** the amount of events shown in the list shall be adjusted to the selected number

### Feature 4: Use the app when offline

**User story:** As a user, I should be able to use the app while being offline
so that I can still get event information which have been previously cached automatically.

**Scenario 1:**
Show cached data when there is no internet connection

* **Given** the user/device was disconnected from internet / has slow network conditions
* **When** user still uses the app to retrieve information about events
* **Then** user shall be provided with previously cached event information

**Scenario 2:**
Show error when user changes the settings (city, time range)
* **Given** the user/device was disconnected from internet / has slow network conditions
* **When** user still uses the app to initialize a settings change (city, time range)
* **Then** user shall be provided with error message saying an active internet connection is required


### Feature 5: Add an app shortcut to the home screen


### Feature 6: Data visualization

**User story:** As a user, I should be able to view a chart showing the number of upcoming events by city
so that I get a better idea of the amount of events being listed per geographical location.

**Scenario 1:**
Show a chart with the number of upcoming events in each city

* **Given** the event list was loaded
* **When** user wants to get a better idea of the amount of events being listed per geo location
* **Then** user will be provided with a chart view indicating the number of upcoming events by city

## Acknowledgements

This project was built as part of the mentored CareerFoundry Full-Stack Web Development Program / Achievement 4/6 / Testing in the Development Process: https://careerfoundry.com/en/courses/become-a-web-developer/
