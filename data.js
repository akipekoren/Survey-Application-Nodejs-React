"use strict";

const sqlite = require("sqlite3");
const bcrypt = require("bcrypt");
const db = new sqlite.Database("survey.db", (err) => {
  if (err) throw err;
});

// create survey

exports.createSurvey = (survey) => {
  return new Promise((resolve, reject) => {
    console.log(survey.id);
    const sql = "INSERT INTO surveys(title,questions,user) VALUES (?,?,?)";
    db.run(sql, [survey.title, survey.questions, survey.user], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};

exports.createAnswer = (answer) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO responses(username,surveyid,answers) VALUES (?,?,?)";
    db.run(
      sql,
      [answer.username, answer.surveyid, answer.answers],
      function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.lastID);
      }
    );
  });
};

// retrieve a survey

exports.retrieveSurvey = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM surveys WHERE id=?";
    db.get(query, [id], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row == undefined) {
        resolve({ error: "Survey not found." });
      } else {
        const survey = {
          id: row.id,
          title: row.title,
          questions: JSON.parse(row.questions),
        };
        resolve(survey);
      }
    });
  });
};

// retrieve all surveys

exports.retrieveSurveys = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM surveys";
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      console.log(rows);
      var surveys = rows.map((e) => ({
        id: e.id,
        title: e.title,
        questions: JSON.parse(e.questions),
      }));
      resolve(surveys);
    });
  });
};

exports.retrieveResponses = (surveyid) => {
  return new Promise((resolve, reject) => {
    const query =
      " SELECT * FROM responses INNER JOIN surveys ON surveys.id=responses.surveyid  WHERE responses.surveyid =? ";
    db.all(query, [surveyid], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      console.log(rows);
      var responses = rows.map((e) => ({
        id: e.id,
        surveyid: e.surveyid,
        username: e.username,
        answers: JSON.parse(e.answers),
        questions: JSON.parse(e.questions),
        title: e.title,
      }));
      resolve(responses);
    });
  });
};

exports.retrieveSurveysAndResponses = (userId) => {
  return new Promise((resolve, reject) => {
    var query =
      "SELECT surveys.id, surveys.title,count(surveyid) as ct FROM surveys LEFT JOIN responses ON surveys.id=responses.surveyid WHERE surveys.user = ? GROUP BY surveys.id";

    db.all(query, [userId], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      console.log(rows);
      var surveys = rows.map((e) => ({
        id: e.id,
        count: e.ct,
        title: e.title,
      }));
      resolve(surveys);
    });
  });
};

// DAO operations for validating users

exports.getUser = (email, password) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.get(sql, [email], (err, row) => {
      if (err) reject(err);
      // DB error
      else if (row === undefined) resolve(false);
      // user not found
      else {
        bcrypt.compare(password, row.hash).then((result) => {
          if (result)
            // password matches
            resolve({ id: row.id, username: row.email, name: row.name });
          else resolve(false); // password not matching
        });
      }
    });
  });
};

exports.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    db.get(sql, [id], (err, row) => {
      if (err) reject(err);
      else if (row === undefined) resolve({ error: "User not found." });
      else {
        // by default, the local strategy looks for "username": not to create confusion in server.js, we can create an object with that property
        const user = { id: row.id, username: row.email, name: row.name };
        resolve(user);
      }
    });
  });
};
