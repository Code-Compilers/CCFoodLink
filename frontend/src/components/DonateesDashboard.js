import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Modal, Form, Table, Badge } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Css/DonateesDashboard.css";

const DonateesDashboard = () => {
  // State for user data
  const [user, setUser] = useState({
    id: 1, // This would come from authentication in a real app
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    address: "123 Main St, City",
    organization: "Food Rescue"
  });
  
  // State for modals
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showAvailableDonations, setShowAvailableDonations] = useState(false);
  
  // State for donations data
  const [availableDonations, setAvailableDonations] = useState([]);
  const [acceptedDonations, setAcceptedDonations] = useState([]);
  
  // State for request form
  const [requestForm, setRequestForm] = useState({
    itemName: "",
    quantity: "",
    urgency: "medium",
    description: ""
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchAcceptedDonations();
  }, []);

  // Fetch accepted donations
  const fetchAcceptedDonations = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/accepted-donations/donatee/${user.id}`);
      setAcceptedDonations(response.data);
    } catch (error) {
      console.error("Error fetching accepted donations:", error);
      toast.error("Failed to load donation history");
    }
  };

  // Fetch available donations
  const fetchAvailableDonations = async () => {
    try {
      const response = await axios.get("http://localhost:8080/donations/available");
      setAvailableDonations(response.data);
      setShowAvailableDonations(true);
    } catch (error) {
      console.error("Error fetching available donations:", error);
      toast.error("Failed to load available donations");
    }
  };

  // Handle form input changes
  const handleRequestFormChange = (e) => {
    const { name, value } = e.target;
    setRequestForm({
      ...requestForm,
      [name]: value
    });
  };

  // Submit donation request
  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/donatees/${user.id}/requests`, requestForm);
      toast.success("Donation request submitted successfully!");
      setShowRequestForm(false);
      setRequestForm({
        itemName: "",
        quantity: "",
        urgency: "medium",
        description: ""
      });
    } catch (error) {
      console.error("Error submitting request:", error);
      toast.error("Failed to submit request");
    }
  };

  // Accept a donation
  const handleAcceptDonation = async (donationId) => {
    try {
      await axios.post(`http://localhost:8080/accepted-donations/accept?donationId=${donationId}&donateeId=${user.id}`);
      toast.success("Donation accepted successfully!");
      
      // Refresh data
      fetchAvailableDonations();
      fetchAcceptedDonations();
    } catch (error) {
      console.error("Error accepting donation:", error);
      toast.error("Failed to accept donation");
    }
  };

  // Get badge for urgency level
  const getUrgencyBadge = (urgency) => {
    switch (urgency) {
      case "high":
        return <Badge bg="danger">High</Badge>;
      case "medium":
        return <Badge bg="warning" text="dark">Medium</Badge>;
      case "low":
        return <Badge bg="success">Low</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  // Get badge for donation status
  const getStatusBadge = (status) => {
    switch (status) {
      case "accepted":
        return <Badge bg="info">Accepted</Badge>;
      case "completed":
        return <Badge bg="success">Completed</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  return (
    <Container className="donatee-dashboard mt-4 mb-5">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* User Profile Section */}
      <Row className="mb-4">
        <Col>
          <Card className="user-profile-card">
            <Card.Body>
              <Card.Title className="text-center mb-4">Welcome, {user.name}</Card.Title>
              <Row>
                <Col md={4} className="text-center">
                  <div className="profile-image-container">
                    <img 
                      src="https://via.placeholder.com/150" 
                      alt="Profile" 
                      className="profile-image"
                    />
                  </div>
                </Col>
                <Col md={8}>
                  <div className="user-details">
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone || "Not provided"}</p>
                    <p><strong>Address:</strong> {user.address || "Not provided"}</p>
                    <p><strong>Organization:</strong> {user.organization || "Not provided"}</p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Action Buttons */}
      <Row className="mb-4">
        <Col className="d-flex justify-content-center gap-3">
          <Button 
            variant="primary" 
            className="action-button"
            onClick={() => setShowRequestForm(true)}
          >
            Request Donation
          </Button>
          <Button 
            variant="success" 
            className="action-button"
            onClick={fetchAvailableDonations}
          >
            View Available Donations
          </Button>
        </Col>
      </Row>

      {/* Donation History Section */}
      <Row>
        <Col>
          <Card className="donation-history-card">
            <Card.Header className="text-center">
              <h4>Donation History</h4>
            </Card.Header>
            <Card.Body>
              {acceptedDonations.length === 0 ? (
                <p className="text-center">No donation history yet.</p>
              ) : (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Donor</th>
                      <th>Food Category</th>
                      <th>Date Accepted</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {acceptedDonations.map((donation) => (
                      <tr key={donation.id}>
                        <td>{donation.donation.description}</td>
                        <td>{donation.donation.donorName}</td>
                        <td>{donation.donation.foodCategory}</td>
                        <td>{new Date(donation.acceptedDate).toLocaleDateString()}</td>
                        <td>{getStatusBadge(donation.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Request Donation Modal */}
      <Modal show={showRequestForm} onHide={() => setShowRequestForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Request Donation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRequestSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                name="itemName"
                value={requestForm.itemName}
                onChange={handleRequestFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                name="quantity"
                value={requestForm.quantity}
                onChange={handleRequestFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Urgency</Form.Label>
              <Form.Select
                name="urgency"
                value={requestForm.urgency}
                onChange={handleRequestFormChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={requestForm.description}
                onChange={handleRequestFormChange}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => setShowRequestForm(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Submit Request
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Available Donations Modal */}
      <Modal 
        show={showAvailableDonations} 
        onHide={() => setShowAvailableDonations(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Available Donations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {availableDonations.length === 0 ? (
            <p className="text-center">No available donations at the moment.</p>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Donor</th>
                  <th>Food Category</th>
                  <th>Delivery Option</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {availableDonations.map((donation) => (
                  <tr key={donation.id}>
                    <td>{donation.donorName}</td>
                    <td>{donation.foodCategory}</td>
                    <td>{donation.deliveryOption}</td>
                    <td>{donation.description}</td>
                    <td>
                      <Button 
                        variant="success" 
                        size="sm"
                        onClick={() => handleAcceptDonation(donation.id)}
                      >
                        Accept
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAvailableDonations(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DonateesDashboard;
