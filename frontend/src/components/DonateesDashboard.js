import React, { useState, useEffect } from "react";
import "../Css/DonateesDashboard.css";

const DonateesDashboard = () => {
  // State for user data
  const [user, setUser] = useState({
    id: 1, // This would come from authentication in a real app
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    address: "123 Main St, City",
    organization: "Food Rescue",
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
    description: "",
  });

  // State for notifications
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchAcceptedDonations();
  }, []);

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Fetch accepted donations
  const fetchAcceptedDonations = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/accepted-donations/donatee/${user.id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch donation history");
      }
      const data = await response.json();
      setAcceptedDonations(data);
    } catch (error) {
      console.error("Error fetching accepted donations:", error);
      showNotification("Failed to load donation history", "error");
    }
  };

  // Fetch available donations
  const fetchAvailableDonations = async () => {
    try {
      const response = await fetch("http://localhost:8081/donations/available");
      if (!response.ok) {
        throw new Error("Failed to fetch available donations");
      }
      const data = await response.json();
      setAvailableDonations(data);
      setShowAvailableDonations(true);
    } catch (error) {
      console.error("Error fetching available donations:", error);
      showNotification("Failed to load available donations", "error");
    }
  };

  // Handle form input changes
  const handleRequestFormChange = (e) => {
    const { name, value } = e.target;
    setRequestForm({
      ...requestForm,
      [name]: value,
    });
  };

  // Submit donation request
  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8081/donatees/${user.id}/requests`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestForm),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit request");
      }

      showNotification("Donation request submitted successfully!");
      setShowRequestForm(false);
      setRequestForm({
        itemName: "",
        quantity: "",
        urgency: "medium",
        description: "",
      });
    } catch (error) {
      console.error("Error submitting request:", error);
      showNotification("Failed to submit request", "error");
    }
  };

  // Accept a donation
  const handleAcceptDonation = async (donationId) => {
    try {
      const response = await fetch(
        `http://localhost:8081/accepted-donations/accept?donationId=${donationId}&donateeId=${user.id}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to accept donation");
      }

      showNotification("Donation accepted successfully!");

      // Refresh data
      fetchAvailableDonations();
      fetchAcceptedDonations();
    } catch (error) {
      console.error("Error accepting donation:", error);
      showNotification("Failed to accept donation", "error");
    }
  };

  // Get status class
  const getStatusClass = (status) => {
    switch (status) {
      case "high":
      case "error":
        return "status-high";
      case "medium":
      case "warning":
        return "status-medium";
      case "low":
      case "success":
      case "accepted":
        return "status-low";
      case "completed":
        return "status-completed";
      default:
        return "status-default";
    }
  };

  return (
    <div className="donatee-dashboard">
      {/* Notification */}
      {notification.show && (
        <div className={`notification ${getStatusClass(notification.type)}`}>
          {notification.message}
        </div>
      )}

      {/* User Profile Section */}
      <div className="profile-card">
        <h2 className="profile-title">Welcome, {user.name}</h2>
        <div className="profile-content">
          <div className="profile-image-container">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="profile-image"
            />
          </div>
          <div className="user-details">
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone || "Not provided"}
            </p>
            <p>
              <strong>Address:</strong> {user.address || "Not provided"}
            </p>
            <p>
              <strong>Organization:</strong>{" "}
              {user.organization || "Not provided"}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button
          className="btn btn-primary"
          onClick={() => setShowRequestForm(true)}
        >
          Request Donation
        </button>
        <button className="btn btn-success" onClick={fetchAvailableDonations}>
          View Available Donations
        </button>
      </div>

      {/* Donation History Section */}
      <div className="history-card">
        <div className="card-header">
          <h3>Donation History</h3>
        </div>
        <div className="card-body">
          {acceptedDonations.length === 0 ? (
            <p className="text-center">No donation history yet.</p>
          ) : (
            <table className="data-table">
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
                    <td>
                      {new Date(donation.acceptedDate).toLocaleDateString()}
                    </td>
                    <td>
                      <span
                        className={`status-badge ${getStatusClass(
                          donation.status
                        )}`}
                      >
                        {donation.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Request Donation Modal */}
      {showRequestForm && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Request Donation</h3>
              <button
                className="close-btn"
                onClick={() => setShowRequestForm(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleRequestSubmit}>
                <div className="form-group">
                  <label>Item Name</label>
                  <input
                    type="text"
                    name="itemName"
                    value={requestForm.itemName}
                    onChange={handleRequestFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    type="text"
                    name="quantity"
                    value={requestForm.quantity}
                    onChange={handleRequestFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Urgency</label>
                  <select
                    name="urgency"
                    value={requestForm.urgency}
                    onChange={handleRequestFormChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    rows={3}
                    name="description"
                    value={requestForm.description}
                    onChange={handleRequestFormChange}
                  ></textarea>
                </div>
                <div className="form-actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowRequestForm(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Available Donations Modal */}
      {showAvailableDonations && (
        <div className="modal-overlay">
          <div className="modal-container modal-lg">
            <div className="modal-header">
              <h3>Available Donations</h3>
              <button
                className="close-btn"
                onClick={() => setShowAvailableDonations(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              {availableDonations.length === 0 ? (
                <p className="text-center">
                  No available donations at the moment.
                </p>
              ) : (
                <table className="data-table">
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
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => handleAcceptDonation(donation.id)}
                          >
                            Accept
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowAvailableDonations(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonateesDashboard;
