import React from 'react';
import { Badge, Container, Dropdown, Form, Nav, Navbar } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CartState } from '../context/Context';
import { AiFillDelete } from 'react-icons/ai';

const Header = () => {
  const {
    state: {cart},
    dispatch
  } = CartState();

  return (
    <Navbar bg="dark" variant="dark" style={{height: 80}}>
      <Container>
        <Navbar.Brand>
          <Link style={{textDecoration: "none", color: "inherit"}}to="/">Shopping Cart</Link>
        </Navbar.Brand>
        <Form>
          <Form.Control 
          style={{width: 500}}
            type="search" 
            placeholder="Search a product" 
            className="m-auto"/>
        </Form>
        <Nav>
          <Dropdown align="end">
            <Dropdown.Toggle variant="success">
              <FaShoppingCart color="white" fontSize="25px" />
              <Badge>{cart.length}</Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{minWidth: 370}}>
              {
                cart.length > 0 ? (
                  <>
                    {cart.map((prod) => (
                      <span className="cartitem" key={prod.id}>
                        <img src={prod.image} className="cartItemImg" alt={prod.name} />
                        <div className="cartItemDetail">
                          <span>{prod.name}</span>
                          <span>${prod.price.split(".")[0]}</span>
                        </div>
                        <AiFillDelete 
                          fontSize="20px" 
                          style={{ cursor: "pointer" }}
                          onClick={() => dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod
                          })}>
                        </AiFillDelete>
                      </span>
                    ))}
                  </>
                ) : (
                  <span style={{padding: 10}}>Cart is Empty!</span>
                )
              }
              
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header