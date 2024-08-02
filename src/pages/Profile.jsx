import { useEffect, useRef } from "react";
import { useState } from "react";
import {
  deleteProductFromDatabase,
  editProductFromDatabase,
  getUserData,
  addNewProductToDatabase,
} from "../dataApi/dataApi";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Nav,
  Navbar,
  Row,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/PCsell Shop Logo PNG.png";

export default function Profile() {
  const [user, setUser] = useState();

  const [showImageModal, setShowImageModal] = useState(false);
  const [imageModalURL, setImageModalURL] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [currentProduct, setCurrentProduct] = useState({});

  const [validated, setValidated] = useState(false);
  const imageRef = useRef();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      if (currentProduct.id) {
        const updatedProducts = user.products.map((product) =>
          product.id === currentProduct.id ? currentProduct : product
        );
        setUser(editProductFromDatabase(user, updatedProducts));
      } else {
        const newProduct = { ...currentProduct, id: Math.random() * 1000 };
        setUser(addNewProductToDatabase(user, newProduct));
      }
    }
    setShowModal(false);

    setValidated(true);
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
    if (name === "img") {
      imageRef.src == value;
    }
  }

  useEffect(() => {
    setUser(getUserData());
  }, []);

  function showImageInModal(url) {
    setImageModalURL(url);
    setShowImageModal(true);
  }

  function deleteProduct(productId) {
    setUser(deleteProductFromDatabase(user.id, productId));
  }

  function createNewProduct() {
    setCurrentProduct({});
    setShowModal(true);
  }

  function editProduct(product) {
    setCurrentProduct(product);
    setShowModal(true);
  }

  return (
    <>
      <header>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand>
              <Link
                to={"/"}
                className="d-flex gap-2 justify-content-center align-items-center"
              >
                <div>
                  <img className="logo" style={{ maxWidth: "90px" }} src={logo} />
                </div>
                <div>PCsell Shop</div>
              </Link>
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

      <section className="container my-4">
        <Button variant="primary" onClick={() => createNewProduct()}>
          Add Product
        </Button>
        <div className="my-3">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>IMG</th>
                <th>Price</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {user &&
                user.products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>
                      <img
                        onClick={() => showImageInModal(product.img)}
                        src={product.img}
                        className="w100px"
                      />
                    </td>
                    <td>
                      <span className="text-success">{product.price}$</span>
                    </td>
                    <td>
                      <Button
                        onClick={() => deleteProduct(product.id)}
                        className="mx-2"
                        variant="danger"
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={() => editProduct(product)}
                        className="mx-2"
                        variant="primary"
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </section>

      <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentProduct.id ? "Edit Product" : "New Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col>
                <Form.Group
                  as={Col}
                  className="my-2"
                  controlId="validationCustom01"
                >
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Category"
                    name="category"
                    value={currentProduct.category || ""}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  className="my-2"
                  controlId="validationCustom01"
                >
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={currentProduct.name || ""}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  className="my-2"
                  controlId="validationCustom01"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={currentProduct.description || ""}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  className="my-2"
                  controlId="validationCustom01"
                >
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="Price"
                    name="price"
                    value={currentProduct.price || ""}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  className="my-2"
                  controlId="validationCustom01"
                >
                  <Form.Label>New</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Yes/No"
                    name="new"
                    value={currentProduct.new || ""}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  className="my-2"
                  controlId="validationCustom01"
                >
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    required
                    type="url"
                    placeholder="URL"
                    name="img"
                    value={currentProduct.img || ""}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <img
                    className="w100px my-2"
                    ref={imageRef}
                    src={currentProduct.img || ""}
                    alt=""
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group
                  as={Col}
                  className="my-2"
                  controlId="validationCustom01"
                >
                  <Form.Label>RAM</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="RAM"
                    name="ram"
                    value={currentProduct.ram || ""}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  className="my-2"
                  controlId="validationCustom01"
                >
                  <Form.Label>CPU</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="CPU"
                    name="cpu"
                    value={currentProduct.cpu || ""}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  className="my-2"
                  controlId="validationCustom01"
                >
                  <Form.Label>ROM</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="ROM"
                    name="rom"
                    value={currentProduct.rom || ""}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  className="my-2"
                  controlId="validationCustom01"
                >
                  <Form.Label>ROM Type</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="For example NVMe"
                    name="romType"
                    value={currentProduct.romType || ""}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  className="my-2"
                  controlId="validationCustom01"
                >
                  <Form.Label>OS</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Operating System"
                    name="operatingSystem"
                    value={currentProduct.operatingSystem || ""}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  className="my-2"
                  controlId="validationCustom01"
                >
                  <Form.Label>Video Card</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Video Card"
                    name="videoCard"
                    value={currentProduct.videoCard || ""}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Check
                required
                label="Agree"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>
            <Button type="submit">Save</Button>
            <Button
              type="reset"
              className="mx-2"
              variant="warning"
              onClick={() => setCurrentProduct({})}
            >
              Reset
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      {/* This Modal Window is showing the image of product */}
      <Modal show={showImageModal} onHide={() => setShowImageModal(false)}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <img src={imageModalURL} />
        </Modal.Body>
      </Modal>
    </>
  );
}
