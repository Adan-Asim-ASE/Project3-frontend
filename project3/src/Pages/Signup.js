import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router';
import { createUser } from '../APIs/UserApis';
import './style.css';

export default function Signup() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const navigate = useNavigate();


  function validate() {
    if (email.length && password.length && name.length) {
      return true;
    }
    return false;
  }

  async function submit(event) {
    event.preventDefault();

    if (!email.length && !password.length && !name.length) {
      alert("Fill all fields");
    }

    const user = {
      name: name,
      email: email,
      password: password,
    }

    let userToken = null;
    
    createUser(user)
      .then(data => {
        userToken = data.data.accessToken;
        document.cookie = 'userToken=' + userToken + '; path=/'
      })
      .catch(
        response => {
          alert("User Signup failed");
        }
      );

    if (userToken != null) {
      alert("Signup Successfull");
      navigate('/posts/me');
    }
  }


  return (
    <div className="Center Container">
      <Form onSubmit={submit} className="block-example border border-ligth p-4">
        <h2 className="mb-4 mt-2 text-primary text-center"><strong>SIGNUP</strong></h2>
        <hr />
        <Form.Group className="mb-3" controlId="name">
          <Form.Label className="mb-3 mt-3"><strong>Name</strong></Form.Label>
          <Form.Control
            autoFocus
            type="name"
            placeholder="xyz abc"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label className="mb-3 mt-3"><strong>Email</strong></Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label className="mb-3 mt-3"><strong>Password</strong></Form.Label>
          <Form.Control
            type="password"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="text-center mt-4">Have account? Click here to
          <NavLink to="/" activeClassName="selected">
            <span className="text-primary NavLink"> Login</span>
          </NavLink>
        </div>
        <Button className="mt-4 mb-3" block size="md" type="submit" disabled={!validate()}>
          Sign Up
        </Button>
      </Form>
    </div>
  );
}
