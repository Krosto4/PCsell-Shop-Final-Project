import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registrateUser } from "../dataApi/dataApi"; // Убедитесь, что путь правильный
import "../page styles/LogInSignIn.css"; // Добавьте путь к вашему CSS файлу

export default function Registration() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    id: Math.random(),
    name: "",
    surname: "",
    username: "",
    tel: "",
    password: "",
    products: [],
  });
  const [successReg, setSuccessReg] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      event.stopPropagation();
      registration(formData);
    }
    setValidated(true);
  }

  function registration(formData) {
    const newUser = formData;
    registrateUser(newUser);
    setSuccessReg("Success")
    setTimeout(() => {
      navigate("/log-in");
    }, 4000);
  }

  function showRusultOfRegistration() {
    if (successReg === "Success") {
      return (
        <Alert className="alertSuccess" variant={"success"}>
          Registration successful! Redirecting...
        </Alert>
      );
    } else if (successReg === "Error") {
      return (
        <Alert className="alertFail" variant={"danger"}>
          Registration failed. Please try again.
        </Alert>
      );
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
              <h1 className="text-center">Sign Up</h1>
              <div className="alertDiv">{showRusultOfRegistration()}</div>
              <Form.Group
                className="my-2"
                as={Col}
                md="12"
                controlId="validationCustom01"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                className="my-2"
                as={Col}
                md="12"
                controlId="validationCustom01"
              >
                <Form.Label>Surname</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Surname"
                  value={formData.surname}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      surname: e.target.value,
                    })
                  }
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                className="my-2"
                as={Col}
                md="12"
                controlId="validationCustom01"
              >
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
              <Form.Group
                className="my-2"
                as={Col}
                md="12"
                controlId="validationCustom01"
              >
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  required
                  type="tel"
                  placeholder="XXX XXX XXXX"
                  value={formData.tel}
                  pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tel: e.target.value,
                    })
                  }
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                className="my-2"
                as={Col}
                md="12"
                controlId="validationCustom02"
              >
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
            <Button type="submit">Sign Up</Button>
            <div className="my-4">
              Already have an account?
              <Link className="btn btn-primary mx-3" to={"/log-in"}>
                Log In
              </Link>
            </div>
          </Form>
        </div>
      </section>
    </>
  );
}
