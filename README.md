# Exam #1: "Survey"
## Student: s287772 IPEKOREN AHMET KAAN

## React Client Application Routes


- Route `/login` : admin login page, ask email and password
- Route `/surveys` : main page, list of survey titles can be seen and clickable
- Route `/surveys/:id` : given survey page for user to fill survey params: surveyid
- Route `/surveys/create` : create survey page, admin only
- Route `/responses/:id` : see the user responses for given surveyid, admin only, params : surveyid
- Route `/surveys/view-results` : survey list of logged in admin and count of responses to these surveys, admin only

## API Server

- GET `/api/surveys/:id`
  - id => surveyid
  - response =>  given survey with questions

- GET `/api/surveys`
  -  no request parameters
  -  response => list of all surveys from the database

- POST `/api/surveys`
  - request parameters => surveyTitle and questions(JSON format)
  - response => HTTP 200 OK

- POST `/api/responses`
  - request parameters=> username, surveyid and answers(JSON format)
  - response => HTTP 200 OK

- GET `/api/responses/:id`
  -  id => surveyid
  -  response => list of all responses to given survey

- GET `/api/view-results`
  -  no request parameters
  -  response => list of all surveys and count of responses with logged in admin

- POST `/api/sessions`
-  request parameters => user information
-  response => user

- DELETE `/api/sessions/current`
 - user information
 - response => HTTP 200 OK

- GET `/api/sessions/current`
 - user information
 - response => user




## Database Tables

- Table `users` - contains xx yy zz
- Table `something` - contains ww qq ss
- ...

## Main React Components

- `ListOfSomething` (in `List.js`): component purpose and main functionality
- `GreatButton` (in `GreatButton.js`): component purpose and main functionality
- ...

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

- username, password (plus any other requested info)
- username, password (plus any other requested info)
