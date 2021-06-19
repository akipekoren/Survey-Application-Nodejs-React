import { Navbar, Nav } from "react-bootstrap";

export default function NavBar(props) {
  return (
    <div>
      <Navbar
        fixed="top"
        bg="dark"
        expand="lg"
        variant="dark"
        style={{ minHeight: "100px" }}
      >
        <Navbar.Brand href="/surveys">Survey Application</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {props.loggedIn ? (
          <>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/surveys/create">Create Survey</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text className="mr-2">
                Signed in as: <a href="#login">{props.name}</a>
              </Navbar.Text>
              <Nav.Item
                onClick={props.doLogOut}
                className="ml-2"
                style={{ color: "white", cursor: "pointer" }}
              >
                {" "}
                Logout{" "}
              </Nav.Item>
            </Navbar.Collapse>
          </>
        ) : (
          <Navbar.Collapse className="justify-content-end">
            <Nav.Link style={{ color: "white" }} href="/login">
              Login
            </Nav.Link>
          </Navbar.Collapse>
        )}
      </Navbar>
    </div>
  );
}
