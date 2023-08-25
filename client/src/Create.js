import { useEffect, useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Create.css";
import {
  Button,
  Container,
  FloatingLabel,
  Form,
  Badge,
  ListGroup,
} from "react-bootstrap";

export default function Create() {
  const api = "http://localhost:3001";

  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    Axios.get(`${api}/users`).then((res) => {
      setUsers(res.data);
    });
  }, [users]);

  const createUser = () => {
    if (name && age && email) {
      Axios.post(`${api}/createUser`, { name, age, email }).then(
        (res) => res.data
      );
    }
  };

  return (
    <>
      <Container>
        <h2>Add User</h2>
        <FloatingLabel label="Name" className="label">
          <Form.Control
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel label="Age" className="label">
          <Form.Control
            type="number"
            placeholder="Age"
            onChange={(e) => setAge(e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel label="Email" className="label">
          <Form.Control
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FloatingLabel>
        <div className="d-grid">
          <Button id="create-user-btn" size="lg" onClick={createUser}>
            Create User
          </Button>
        </div>

        {users.map(({ _id, name, age, email }) => {
          return (
            <ListGroup>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
                id="list-group"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{name}</div>
                  {email}
                </div>
                <Badge bg="primary" pill>
                  {age} years old
                </Badge>
              </ListGroup.Item>
            </ListGroup>
          );
        })}
      </Container>
    </>
  );
}
