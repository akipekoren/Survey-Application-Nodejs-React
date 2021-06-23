import Home from "./components/Home/Home";
import Detail from "./components/Details/Detail";
import Create from "./components/Create/Create";
import { LoginForm } from "./components/login/Login";
import { Row, Container, Col } from "react-bootstrap";
import NavBar from "./components/Nav/NavBar";
import Header from "./components/Header/Header";
import ListSurveys from "./components/Response/ListSurveys";
import Response from "./components/Response/Response";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import API from "./API";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [confirmation, setConfirmation] = useState("");

  useEffect(() => {
    let isComponentMounted = true;

    const checkAuth = async () => {
      try {
        // here you have the user info, if already logged in
        // TODO: store them somewhere and use them, if needed
        if (isComponentMounted) {
          await API.getUserInfo().then((newU) => {
            setName(newU.name);
          });
          setLoggedIn(true);
        }
      } catch (err) {}
    };
    checkAuth();
    return () => {
      isComponentMounted = false;
    };
  }, []);

  const doLogIn = async (credentials) => {
    try {
      const user = await API.logIn(credentials);

      setLoggedIn(true);
      setMessage({ msg: `Welcome, ${user}!`, type: "success" });
    } catch (err) {
      setMessage({ msg: err, type: "danger" });
    }
  };

  const doLogOut = async () => {
    await API.logOut();
    setLoggedIn(false);
  };

  return (
    <>
      <Router>
        <NavBar loggedIn={loggedIn} name={name} doLogOut={doLogOut} />
        <Switch>
          <Route
            path="/login"
            render={() => (
              <>
                {loggedIn ? (
                  <Redirect to="/surveys" />
                ) : (
                  <div className="container mt-5 pt-5">
                    <LoginForm login={doLogIn} />
                  </div>
                )}
              </>
            )}
          />
          <Route exact path="/surveys">
            <div className="App">
              <Home confirmation={confirmation} />
            </div>
          </Route>

          <Route exact path="/surveys/create">
            {loggedIn ? (
              <>
                <Header header="Create Questions" color="#5E630D" />
                <Row>
                  <Col className="text-center">
                    <Create />
                  </Col>
                </Row>
              </>
            ) : (
              <div className="justify-content-md-center mt-5 text-center">
                <h1> You do not have permission to do this!! </h1>
                <Link to="/login">Login to create survey from here</Link>
              </div>
            )}
          </Route>

          <Route exact path="/responses/:id">
            {loggedIn ? (
              <>
                <Response />
              </>
            ) : (
              <div className="justify-content-md-center mt-5 text-center">
                <h1> You do not have permission to do this!! </h1>
                <Link to="/login">Login to create survey from here</Link>
              </div>
            )}
          </Route>

          <Route exact path="/surveys/view-results">
            {loggedIn ? (
              <>
                <Header
                  header="Your surveys and their responses"
                  color="#5E630D"
                />
                <ListSurveys />
              </>
            ) : (
              <div className="justify-content-md-center mt-5 text-center">
                <h1> You do not have permission to do this!! </h1>
                <Link to="/login">Login to create survey from here</Link>
              </div>
            )}
          </Route>
          <Route path={["/surveys/:id"]}>
            {" "}
            <Header header="Answer the Questions" color="#5E630D" />
            <Detail setConfirmation={setConfirmation} />
          </Route>
          <Redirect to="/surveys" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
