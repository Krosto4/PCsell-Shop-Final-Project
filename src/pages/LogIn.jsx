import { Alert, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { logInUser } from "../dataApi/dataApi";
import "../page styles/LogInSignIn.css";  // Добавьте путь к вашему CSS файлу

export default function LogIn() {
  const [validated, setValidated] = useState(false);
  const [successLogIn, setSuccessLogIn] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      event.stopPropagation();
      const user = logInUser(formData);
      if (user) {
        setSuccessLogIn("Success");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        setSuccessLogIn("Error");
        setFormData({
          username: "",
          password: "",
        });
      }
    }

    setValidated(true);
  };

  function showRusultOfLogIn(){
    if(successLogIn === "Success"){
        return(
            <Alert className="alertSuccess" variant={"success"}>
                Login successful! Redirecting...
            </Alert>
        )
    } else if(successLogIn === "Error") {
        return(
            <Alert className="alertFail" variant={"danger"}>
                Login failed. Please try again.
            </Alert>
        )
    }
  }

  return (
    <>
      <header>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand>
              <Link to={"/"}>PCsell Shop</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link to={"/"} className="mx-2 p-1">
                  Home
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <section>
        <div className="col-5 m-auto">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <h1 className="text-center">Log In</h1>
              <div className="alertDiv">
                {showRusultOfLogIn()}
              </div>
              <Form.Group className="my-2" as={Col} md="12" controlId="validationCustom01">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      username: e.target.value,
                    })
                  }
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="my-2" as={Col} md="12" controlId="validationCustom02">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Check
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>
            <Button type="submit">Log In</Button>
            <div className="my-4">
                  Don't have an account? Create it!
                  <Link className="btn btn-primary mx-3" to={"/registration"}>Registration</Link>
            </div>
          </Form>
        </div>
      </section>
    </>
  );
}
