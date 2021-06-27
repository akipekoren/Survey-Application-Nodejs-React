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

- POST `/api/login`
  - request parameters and request body content
  - response body content
- GET `/api/something`
  - request parameters
  - response body content
- POST `/api/something`
  - request parameters and request body content
  - response body content
- ...

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
