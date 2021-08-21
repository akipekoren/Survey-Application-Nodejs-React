const express = require("express");
const morgan = require("morgan");
const db = require("./data.js");

const session = require("express-session"); // session middleware
const passport = require("passport");
const passportLocal = require("passport-local");
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 3001;

// initialize and configure passport
passport.use(
  new passportLocal.Strategy((username, password, done) => {
    // verification callback for authentication

    db.getUser(username, password)
      .then((user) => {
        if (user) done(null, user);
        else done(null, false, { message: "Username or password wrong" });
      })
      .catch((err) => {
        done(err);
      });
  })
);

// serialize and de-serialize the user (user object <-> session)
// we serialize the user id and we store it in the session: the session is very small in this way
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((id, done) => {
  db.getUserById(id)
    .then((user) => {
      done(null, user); // this will be available in req.user
    })
    .catch((err) => {
      done(err, null);
    });
});

app = new express();
app.use(morgan("dev"));
app.use(express.json());

// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  return res.status(401).json({ error: "not authenticated" });
};

// initialize and configure HTTP sessions
app.use(
  session({
    secret: "this and that and other",
    resave: false,
    saveUninitialized: false,
  })
);

// tell passport to use session cookies
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
//app.options("*", cors());
// GET /api/surveys/:id

app.get("/api/surveys/:id", (req, res) => {
  db.retrieveSurvey(req.params.id)
    .then((survey) => res.json(survey))
    .catch(() => res.status(500).end());
});

// GET /api/surveys

app.get("/api/surveys", (req, res) => {
  db.retrieveSurveys()
    .then((surveys) => res.json(surveys))
    .catch(() => res.status(500).end());
});

// POST /api/surveys

app.post("/api/surveys", async (req, res) => {
  let title = req.body.title;
  let questions = req.body.questions;
  if (req.isAuthenticated()) {
    try {
      await db.createSurvey({
        title: title,
        questions: JSON.stringify(questions),
        user: req.user.id,
      });
      res.end();
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

// POST /api/responses

app.post("/api/responses", async (req, res) => {
  let username = req.body.username;
  let surveyid = req.body.surveyid;
  let answers = req.body.answers;

  try {
    await db.createAnswer({
      username: username,
      surveyid: surveyid,
      answers: JSON.stringify(answers),
    });
    res.end();
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET api/surveys/view-results

app.get("/api/view-results", (req, res) => {
  if (req.isAuthenticated()) {
    db.retrieveSurveysAndResponses(req.user.id)
      .then((surveys) => res.json(surveys))
      .catch(() => res.status(500).end());
  } else res.status(401).json({ error: "Unauthenticated user!" });
});

// GET api/responses

app.get("/api/responses/:id", (req, res) => {
  db.retrieveResponses(req.params.id)
    .then((responses) => res.json(responses))
    .catch(() => res.status(500).end());
});

// POST /sessions
// login
app.post("/api/sessions", function (req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      // display wrong login messages
      return res.status(401).json(info);
    }
    // success, perform the login
    req.login(user, (err) => {
      if (err) return next(err);

      // req.user contains the authenticated user, we send all the user info back

      return res.json(req.user);
    });
  })(req, res, next);
});

// DELETE /sessions/current
// logout
app.delete("/api/sessions/current", (req, res) => {
  req.logout();
  res.end();
});

// GET /sessions/current
// check whether the user is logged in or not
app.get("/api/sessions/current", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  } else res.status(401).json({ error: "Unauthenticated user!" });
});

// Serve static assets if in production

if (process.env.NODE_ENV === "production") {
  //Set static folder

  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}/`)
);
