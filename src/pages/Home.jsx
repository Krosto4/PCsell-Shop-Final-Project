import { useEffect, useState } from "react";
import { Carousel, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getUserData, logOut } from "../dataApi/dataApi";

export default function Home() {
  const [user, setUser] = useState();
  useEffect(()=>{
    setUser(getUserData())
  }, [])

  function logOutUser(){
    logOut();
    setUser(null)
  }

  function showMenu() {
    if (user) {
      return (
        <Nav className="me-auto">
          <Link to={"/"} className="mx-2 p-1">
            Home
          </Link>
          <Link to={"/shop"} className="mx-2 p-1">
            Shop
          </Link>
          <Link to={"/profile"} className="mx-2 p-1">
            Profile
          </Link>
          <Link onClick={logOutUser} className="mx-2 p-1 rounded text-light bg-danger">Log Out</Link>
        </Nav>
      );
    } else {
      return (
        <Nav className="me-auto">
          <Link to={"/"} className="mx-2 p-1">
            Home
          </Link>
          <Link to={"/shop"} className="mx-2 p-1">
            Shop
          </Link>
          <Link
            to={"/log-in"}
            className="mx-2 p-1 rounded text-light bg-primary"
          >
            Log In
          </Link>
        </Nav>
      );
    }
  }
  return (
    <>
      <header>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="">
              <Link to={"/"}>PCsell Shop</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              {showMenu()}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <section>
      <Carousel className="col-9 m-auto" >
      <Carousel.Item style={{maxHeight: "90vh"}}>
         <div className="d-flex justify-content-center">
            <img width={"75%"} src="https://images-cdn.ubuy.co.in/635f8ad9afed8b54834faff3-dell-xps-13-plus-9320-13-4.jpg" alt="" />
         </div>
        <Carousel.Caption>
          <h3>Dell XPS 13</h3>
          <p>Compact and powerful ultrabook</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{maxHeight: "90vh"}}>
      <div className="d-flex justify-content-center">
            <img width={"80%"} src="https://m.media-amazon.com/images/I/71o6nKXmjTL._AC_SL1500_.jpg" alt="" />
         </div>
        <Carousel.Caption>
          <h3>ASUS ROG Zephyrus G14</h3>
          <p>Compact gaming laptop with high performance</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{maxHeight: "90vh"}}>
      <div className="d-flex justify-content-center">
            <img width={"75%"} src="https://www.notebookcheck.net/uploads/tx_nbc2/MateBook_X_Pro_2023_8.jpg" alt="" />
         </div>
        <Carousel.Caption>
          <h3>Huawei MateBook X Pro</h3>
          <p>
          Sleek ultrabook with a vibrant display
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
      </section>
    </>
  );
}
