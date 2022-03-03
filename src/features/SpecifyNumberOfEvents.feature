Feature: Specify number of events

Scenario: When user has not specified a number, 32 is the default number
Given the event list was loaded
When user does not interact with -amount of events- selection feature/function
Then 32 events shall be listed per default

Scenario: User can change the number of events they want to see
Given the event list was loaded
When user wants to adjust the amount of shown events and selects respective feature/function
Then the amount of events shown in the list shall be adjusted to the selected number