import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';
import { useFlightDetails } from '../contexts/FlightContext';
import { useNavigate } from 'react-router-dom';

export default function CreateFlight() {

  const { addFlightDetails } = useFlightDetails();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    from: '',
    to: '',
    duration: '',
    price: '',
    dep: '00:00',
    arr: '00:00',
    logo: null
  });

  function validate() {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Airline name is required";
    if (!formData.from.trim()) newErrors.from = "From location is required";
    if (!formData.to.trim()) newErrors.to = "To location is required";
    if (!formData.duration || formData.duration <= 0) newErrors.duration = "Duration must be greater than 0";
    if (!formData.price || formData.price <= 0) newErrors.price = "Price must be greater than 0";
    if (!formData.dep) newErrors.dep = "Departure time required";
    if (!formData.arr) newErrors.arr = "Arrival time required";
    if (!formData.logo) newErrors.logo = "Logo is required";

    return newErrors;
  }

  function handleChange(e) {
    const { name, value, files, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : (type === 'number' ? Number(value) : value)
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    addFlightDetails(formData);
    navigate('/');
  }

  return (
    <div className="container mt-4">
      <div className="p-4 rounded-4 shadow-sm" style={{ backgroundColor: "#f8f5f0" }}>

        <Container fluid>
          <Row className="justify-content-center">

            <Card className="border-0 shadow-sm rounded-4 mx-auto" style={{ maxWidth: '700px' }}>
              <Card.Body>

                <Card.Title className="mb-4 fw-semibold" style={{ color: '#333' }}>
                  Create Flight
                </Card.Title>

                <Form onSubmit={handleSubmit}>

                  <Form.Group className="mb-3">
                    <Form.Label className="text-muted small">Airline Name</Form.Label>
                    <Form.Control
                      className="rounded-pill px-3"
                      name="name"
                      type="text"
                      placeholder="Airline"
                      value={formData.name}
                      onChange={handleChange}
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-muted small">From</Form.Label>
                        <Form.Control
                          className="rounded-pill px-3"
                          name="from"
                          type="text"
                          placeholder="From"
                          value={formData.from}
                          onChange={handleChange}
                          isInvalid={!!errors.from}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.from}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-muted small">To</Form.Label>
                        <Form.Control
                          className="rounded-pill px-3"
                          name="to"
                          type="text"
                          placeholder="To"
                          value={formData.to}
                          onChange={handleChange}
                          isInvalid={!!errors.to}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.to}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-muted small">Duration (Minutes)</Form.Label>
                        <Form.Control
                          className="rounded-pill px-3"
                          name="duration"
                          type="number"
                          value={formData.duration}
                          onChange={handleChange}
                          isInvalid={!!errors.duration}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.duration}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-muted small">Price ($)</Form.Label>
                        <Form.Control
                          className="rounded-pill px-3"
                          name="price"
                          type="number"
                          value={formData.price}
                          onChange={handleChange}
                          isInvalid={!!errors.price}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.price}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-muted small">Departure</Form.Label>
                        <Form.Control
                          className="rounded-pill px-3"
                          name="dep"
                          type="time"
                          value={formData.dep}
                          onChange={handleChange}
                          isInvalid={!!errors.dep}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.dep}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-muted small">Arrival</Form.Label>
                        <Form.Control
                          className="rounded-pill px-3"
                          name="arr"
                          type="time"
                          value={formData.arr}
                          onChange={handleChange}
                          isInvalid={!!errors.arr}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.arr}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label className="text-muted small">Logo</Form.Label>
                    <Form.Control
                      className="rounded-3"
                      name="logo"
                      type="file"
                      onChange={handleChange}
                      isInvalid={!!errors.logo}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.logo}
                    </Form.Control.Feedback>

                    {formData.logo && (
                      <img
                        src={URL.createObjectURL(formData.logo)}
                        width="50"
                        className="mt-2 rounded-circle border"
                      />
                    )}
                  </Form.Group>

                  <div className="text-center">
                    <Button
                      type="submit"
                      className="rounded-pill px-4 mt-2"
                      style={{ backgroundColor: '#0d6efd', border: 'none' }}
                    >
                      Add Flight
                    </Button>
                  </div>

                </Form>

              </Card.Body>
            </Card>

          </Row>
        </Container>

      </div>
    </div>
  )
}