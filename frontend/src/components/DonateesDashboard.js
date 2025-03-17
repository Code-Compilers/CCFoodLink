import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Container, Grid, Card, CardContent, Typography, Button, 
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, Divider, Avatar, Box, Chip
} from '@mui/material';
import { PersonOutline, History, LocalShipping, Add } from '@mui/icons-material';
import './DonateesDashboard.css';

const DonateesDashboard = () => {
  const [profile, setProfile] = useState({});
  const [myRequests, setMyRequests] = useState([]);
  const [acceptedDonations, setAcceptedDonations] = useState([]);
  const [availableDonations, setAvailableDonations] = useState([]);
  
  const [openRequestDialog, setOpenRequestDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  
  const [newRequest, setNewRequest] = useState({
    itemName: '',
    quantity: '',
    urgency: 'LOW',
    description: ''
  });

  useEffect(() => {
    // Fetch all required data when component mounts
    fetchProfile();
    fetchMyRequests();
    fetchAcceptedDonations();
    fetchAvailableDonations();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/donatee/profile');
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchMyRequests = async () => {
    try {
      const response = await axios.get('/api/donatee/donations');
      setMyRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const fetchAcceptedDonations = async () => {
    try {
      const response = await axios.get('/api/donatee/donations/accepted');
      setAcceptedDonations(response.data);
    } catch (error) {
      console.error('Error fetching accepted donations:', error);
    }
  };

  const fetchAvailableDonations = async () => {
    try {
      const response = await axios.get('/api/donatee/donations/available');
      setAvailableDonations(response.data);
    } catch (error) {
      console.error('Error fetching available donations:', error);
    }
  };

  const handleRequestSubmit = async () => {
    try {
      await axios.post('/api/donatee/request', newRequest);
      setOpenRequestDialog(false);
      fetchMyRequests(); // Refresh the list
      
      // Reset form
      setNewRequest({
        itemName: '',
        quantity: '',
        urgency: 'LOW',
        description: ''
      });
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  const handleAcceptDonation = async (donationId) => {
    try {
      await axios.post(`/api/donatee/accept/${donationId}`);
      fetchAvailableDonations();
      fetchAcceptedDonations();
    } catch (error) {
      console.error('Error accepting donation:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRequest(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const showDonationDetails = (donation) => {
    setSelectedDonation(donation);
    setOpenDetailsDialog(true);
  };

  // Status chip color mapping
  const getStatusColor = (status) => {
    switch(status.toUpperCase()) {
      case 'PENDING': return 'warning';
      case 'ACCEPTED': return 'success';
      case 'REJECTED': return 'error';
      case 'AVAILABLE': return 'info';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="lg" className="dashboard-container">
      {/* Profile Section */}
      <Card className="profile-card">
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar className="profile-avatar">
                <PersonOutline fontSize="large" />
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h5">{profile.name}</Typography>
              <Typography variant="body1">{profile.email}</Typography>
              <Typography variant="body2" color="textSecondary">{profile.address}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* My Requests Section */}
      <div className="dashboard-section">
        <Typography variant="h5" className="section-title">
          My Requests
          <Button 
            variant="contained" 
            startIcon={<Add />} 
            className="add-button"
            onClick={() => setOpenRequestDialog(true)}
          >
            New Request
          </Button>
        </Typography>
        
        <Grid container spacing={3}>
          {myRequests.length > 0 ? (
            myRequests.map(request => (
              <Grid item xs={12} sm={6} md={4} key={request.id}>
                <Card className="donation-card card-hover">
                  <CardContent>
                    <Typography variant="h6" noWrap>{request.itemName}</Typography>
                    <Chip 
                      label={request.status} 
                      color={getStatusColor(request.status)} 
                      size="small" 
                      className="status-chip"
                    />
                    <Typography variant="body2" color="textSecondary" noWrap>
                      Quantity: {request.quantity}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" noWrap>
                      Urgency: {request.urgency}
                    </Typography>
                    <Button 
                      variant="outlined" 
                      size="small" 
                      className="view-details-button"
                      onClick={() => showDonationDetails(request)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="body1" align="center" className="empty-message">
                You haven't made any requests yet.
              </Typography>
            </Grid>
          )}
        </Grid>
      </div>

      {/* Available Donations Section */}
      <div className="dashboard-section">
        <Typography variant="h5" className="section-title">
          Available Donations
        </Typography>
        
        <Grid container spacing={3}>
          {availableDonations.length > 0 ? (
            availableDonations.map(donation => (
              <Grid item xs={12} sm={6} md={4} key={donation.id}>
                <Card className="donation-card card-hover">
                  <CardContent>
                    <Typography variant="h6" noWrap>{donation.itemName}</Typography>
                    <Typography variant="body2" color="textSecondary" noWrap>
                      Quantity: {donation.quantity}
                    </Typography>
                    <Box className="card-actions">
                      <Button 
                        variant="outlined" 
                        size="small"
                        onClick={() => showDonationDetails(donation)}
                      >
                        View Details
                      </Button>
                      <Button 
                        variant="contained" 
                        size="small"
                        onClick={() => handleAcceptDonation(donation.id)}
                      >
                        Accept
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="body1" align="center" className="empty-message">
                No available donations at the moment.
              </Typography>
            </Grid>
          )}
        </Grid>
      </div>

      {/* Accepted Donations History */}
      <div className="dashboard-section">
        <Typography variant="h5" className="section-title">
          <History fontSize="small" className="section-icon" />
          Donation History
        </Typography>
        
        <Grid container spacing={3}>
          {acceptedDonations.length > 0 ? (
            acceptedDonations.map(donation => (
              <Grid item xs={12} sm={6} md={4} key={donation.id}>
                <Card className="donation-card card-hover">
                  <CardContent>
                    <Typography variant="h6" noWrap>{donation.itemName}</Typography>
                    <Chip 
                      label="Accepted" 
                      color="success" 
                      size="small" 
                      className="status-chip"
                    />
                    <Typography variant="body2" color="textSecondary">
                      Received on: {new Date(donation.updatedAt).toLocaleDateString()}
                    </Typography>
                    <Button 
                      variant="outlined" 
                      size="small" 
                      className="view-details-button"
                      onClick={() => showDonationDetails(donation)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="body1" align="center" className="empty-message">
                You haven't received any donations yet.
              </Typography>
            </Grid>
          )}
        </Grid>
      </div>

      {/* New Request Dialog */}
      <Dialog open={openRequestDialog} onClose={() => setOpenRequestDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Donation Request</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="itemName"
            label="Item Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newRequest.itemName}
            onChange={handleInputChange}
            className="dialog-field"
          />
          <TextField
            margin="dense"
            name="quantity"
            label="Quantity"
            type="text"
            fullWidth
            variant="outlined"
            value={newRequest.quantity}
            onChange={handleInputChange}
            className="dialog-field"
          />
          <TextField
            select
            margin="dense"
            name="urgency"
            label="Urgency"
            fullWidth
            variant="outlined"
            value={newRequest.urgency}
            onChange={handleInputChange}
            className="dialog-field"
          >
            <MenuItem value="LOW">Low</MenuItem>
            <MenuItem value="MEDIUM">Medium</MenuItem>
            <MenuItem value="HIGH">High</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={newRequest.description}
            onChange={handleInputChange}
            className="dialog-field"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRequestDialog(false)}>Cancel</Button>
          <Button onClick={handleRequestSubmit} variant="contained">Submit Request</Button>
        </DialogActions>
      </Dialog>

      {/* Donation Details Dialog */}
      <Dialog open={openDetailsDialog} onClose={() => setOpenDetailsDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Donation Details</DialogTitle>
        {selectedDonation && (
          <DialogContent>
            <Typography variant="h6">{selectedDonation.itemName}</Typography>
            <Chip 
              label={selectedDonation.status} 
              color={getStatusColor(selectedDonation.status)} 
              size="small" 
              className="status-chip"
            />
            
            <Divider className="details-divider" />
            
            <Typography variant="subtitle2">Quantity:</Typography>
            <Typography variant="body1" paragraph>{selectedDonation.quantity}</Typography>
            
            <Typography variant="subtitle2">Urgency:</Typography>
            <Typography variant="body1" paragraph>{selectedDonation.urgency}</Typography>
            
            <Typography variant="subtitle2">Description:</Typography>
            <Typography variant="body1" paragraph>{selectedDonation.description || "No description provided."}</Typography>
            
            <Typography variant="subtitle2">Created At:</Typography>
            <Typography variant="body1" paragraph>
              {new Date(selectedDonation.createdAt).toLocaleString()}
            </Typography>
            
            {selectedDonation.status === 'ACCEPTED' && (
              <>
                <Typography variant="subtitle2">Accepted At:</Typography>
                <Typography variant="body1" paragraph>
                  {new Date(selectedDonation.updatedAt).toLocaleString()}
                </Typography>
              </>
            )}
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={() => setOpenDetailsDialog(false)}>Close</Button>
          {selectedDonation && selectedDonation.status === 'AVAILABLE' && (
            <Button 
              onClick={() => {
                handleAcceptDonation(selectedDonation.id);
                setOpenDetailsDialog(false);
              }} 
              variant="contained" 
              color="primary"
            >
              Accept Donation
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DonateesDashboard;