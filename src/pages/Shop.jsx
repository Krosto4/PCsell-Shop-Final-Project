import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Modal,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllCategories, getAllProducts } from "../dataApi/dataApi";
import logo from "../assets/PCsell Shop Logo PNG.png";

export default function Shop() {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);

  const [productInfoInModal, setProductInfoInModal] = useState({});

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (info) => {
    setShow(true);
    setProductInfoInModal({...info})
  };

  useEffect(() => {
    setCategory(getAllCategories());
    setProducts(getAllProducts());
    setFilterProducts(getAllProducts());
  }, []);

  function filterProductByCategory(category) {
    setFilterProducts(
      products.filter((product) =>
        product.category.toLowerCase().includes(category.toLowerCase())
      )
    );
  }

  function filterProductByText(e) {
    const searchText = e.target.value.toLowerCase();
    setFilterProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchText)
      )
    );
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
                  <img style={{ maxWidth: "90px" }} src={logo} />
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

      <section className="my-3">
        <div className="container row m-auto">
          <div className="col-2">
            <Form.Control
              onChange={filterProductByText}
              className="my-2"
              size="md"
              type="text"
              placeholder="Serach"
            />
            <ListGroup>
              <ListGroup.Item
                onClick={() => setFilterProducts(getAllProducts())}
              >
                All
              </ListGroup.Item>

              {category.map((cat, index) => (
                <ListGroup.Item
                  key={index}
                  onClick={() => filterProductByCategory(cat)}
                >
                  {cat}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>

          <div className="col-10">
            <Row xs={2} md={5} className="g-2">
              {filterProducts.map((product, index) => (
                <Col key={index}>
                  <Card>
                    <Card.Img variant="top" src={product.img} className="p-2" />
                    <Card.Body>
                      <div>
                        <div>{product.name}</div>
                        <div>{product.description}</div>
                        <div>New: {product.new}</div>
                        <div>
                          <del className="text-danger">
                            <sup>{product.price}$</sup>
                          </del>
                          <span className="text-success">
                            {product.price - 1}$!
                          </span>
                        </div>
                      </div>
                      <div className="text-center my-2">
                        <Button
                          variant="primary"
                          onClick={() => handleShow(product)}
                        >
                          More Info
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </section>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{productInfoInModal.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <img src={productInfoInModal.img} alt="" />
            </div>
            <div className="row my-4">
              <div className="col">
                <div>Category: {productInfoInModal.category}</div>
                <div>Name: {productInfoInModal.name}</div>
                <div>Description: {productInfoInModal.description}</div>
                <div>New: {productInfoInModal.new}</div>
                <div>Price: <span className="text-success">{productInfoInModal.price -1}$</span></div>
              </div>
              <div className="col">
                <div>RAM: {productInfoInModal.ram}GB</div>
                <div>CPU: {productInfoInModal.cpu}</div>
                <div>OS: {productInfoInModal.operatingSystem}</div>
                <div>Video Card: {productInfoInModal.videoCard} </div>
                <div>ROM: {productInfoInModal.rom}GB</div>
                <div>ROM Type: {productInfoInModal.romType} </div>

              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
