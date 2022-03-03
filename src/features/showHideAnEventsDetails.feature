Feature: Show or hide event details

Scenario: An event element is collapsed by default
Given the event list was loaded
When user does not interact with shown event items
Then all event items shall be collapsed

Scenario: User can expand an event to see its details
Given the event list was loaded and shows at least a selection of collapsed event items
When user clicks on single event item to get more information
Then the event detail view shall be expanded

Scenario: User can collapse an event to hide its details
Given an event detail view was loaded
When user gives the command to hide the currently shown event detail view
Then the event detail view shall be closed