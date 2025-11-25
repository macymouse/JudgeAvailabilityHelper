# JudgeAvailabilityHelper
VEX TM Web App to provide judges conducting team interviews a dashboard to view team assignment, availability and status.

Integration via exported data or API.

Progress:
* Python script to extract match times per team from given tournament data exports and generate json files.
* ~~Very basic html display without integration.~~
* Basic login via javascript: note this is easy to bypass by reading the script.js and acts only as a simple wall
* HTML generation based on provided json files.
* Countdown to next match and status updates.
* Functional checkbox to filter by division.

Next steps:
* Configuration variables.
* Mobile styling.
* JSON implementation documentation and demo.
* Sort by filters.
* API implementation (one day?).

Going to have two projects in one achieving the same goal because I'm not confident in my skills to implement the VEX TM API just yet. Directory jsonVEX will be providing a static webpage that generates based on JS, with jsons generated from a Python script. Directory apiVEX will be providing a React webapp connecting to the VEX TM API.

old-code just contains some old files I made so I can reference how I have done things in the past.