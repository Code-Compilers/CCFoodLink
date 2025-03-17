import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Container, Grid, Card, CardContent, Typography, Button, 
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, Divider, Avatar, Box, Chip
} from '@mui/material';
import { PersonOutline, History, LocalShipping, Add } from '@mui/icons-material';

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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Profile Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}>
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
      <Typography variant="h5" sx={{ mb: 2 }}>
        My Requests
        <Button 
          variant="contained" 
          startIcon={<Add />} 
          sx={{ ml: 2 }}
          onClick={() => setOpenRequestDialog(true)}
        >
          New Request
        </Button>
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {myRequests.length > 0 ? (
          myRequests.map(request => (
            <Grid item xs={12} sm={6} md={4} key={request.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" noWrap>{request.itemName}</Typography>
                  <Chip 
                    label={request.status} 
                    color={getStatusColor(request.status)} 
                    size="small" 
                    sx={{ mb: 1 }}
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
                    sx={{ mt: 1 }}
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
            <Typography variant="body1" align="center">
              You haven't made any requests yet.
            </Typography>
          </Grid>
        )}
      </Grid>

      {/* Available Donations Section */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        Available Donations
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {availableDonations.length > 0 ? (
          availableDonations.map(donation => (
            <Grid item xs={12} sm={6} md={4} key={donation.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" noWrap>{donation.itemName}</Typography>
                  <Typography variant="body2" color="textSecondary" noWrap>
                    Quantity: {donation.quantity}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
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
            <Typography variant="body1" align="center">
              No available donations at the moment.
            </Typography>
          </Grid>
        )}
      </Grid>

      {/* Accepted Donations History */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        <History fontSize="small" sx={{ mr: 1 }} />
        Donation History
      </Typography>
      
      <Grid container spacing={3}>
        {acceptedDonations.length > 0 ? (
          acceptedDonations.map(donation => (
            <Grid item xs={12} sm={6} md={4} key={donation.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" noWrap>{donation.itemName}</Typography>
                  <Chip 
                    label="Accepted" 
                    color="success" 
                    size="small" 
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="body2" color="textSecondary">
                    Received on: {new Date(donation.updatedAt).toLocaleDateString()}
                  </Typography>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    sx={{ mt: 1 }}
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
                    <Typography variant="body1" align="center">
                      You haven't received any donations yet.
                    </Typography>
                  </Grid>
                )}
              </Grid>
        
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
                    sx={{ mb: 2 }}
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
                    sx={{ mb: 2 }}
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
                    sx={{ mb: 2 }}
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
                      sx={{ mb: 2 }}
                    />
                    
                    <Divider sx={{ my: 2 }} />
                    
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
        
