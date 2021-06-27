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

- Table `users` - contains id email name hash
- Table `surveys` - contains id title questions user
- Table `responses` - contains id username surverid answers


## Main React Components


- `Navbar` (in `Nav/Navbar.js`) : handles navbar and its components
- `Login` (in `Login/Login.js`) : handles login operation
- `Response` (in `Response/Response.js`) : show the responses to a given survey
- `Home` (in `Home/Home.js`) : show all the recorded surveys in main page
- `Detail` (in `Details/Detail.js`) : allow user to fill survey
- `Create` (in `Create/Create.js`) : for survey creation

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials


1 - )
- username : admin@gmail.com  password : password
list of Surveys : Euro 2020 Survey, Sports Car Survey, Movies Survey
2 - )
- username : admin2@gmail.com  password : password
list of Surveys : Favourite Season Survey, University Survey
