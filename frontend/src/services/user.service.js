import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/api/";

class UserService {
  // Donator services
  getDonatorProfile() {
    return axios.get(API_URL + "donator/profile", { headers: authHeader() });
  }

  getDonatorDonations() {
    return axios.get(API_URL + "donator/donations", { headers: authHeader() });
  }

  getDonationRequests() {
    return axios.get(API_URL + "donator/requests", { headers: authHeader() });
  }

  createDonation(donationData) {
    return axios.post(API_URL + "donator/donate", donationData, { headers: authHeader() });
  }

  acceptRequest(requestId) {
    return axios.post(API_URL + `donator/accept-request/${requestId}`, {}, { headers: authHeader() });
  }

  // Donatee services
  getDonateeProfile() {
    return axios.get(API_URL + "donatee/profile", { headers: authHeader() });
  }

  getDonateeRequests() {
    return axios.get(API_URL + "donatee/requests", { headers: authHeader() });
  }

  getDonateeDonations() {
    return axios.get(API_URL + "donatee/donations", { headers: authHeader() });
  }

  getAvailableDonations() {
    return axios.get(API_URL + "donatee/available-donations", { headers: authHeader() });
  }

  createRequest(requestData) {
    return axios.post(API_URL + "donatee/request", requestData, { headers: authHeader() });
  }

  acceptDonation(donationId) {
    return axios.post(API_URL + `donatee/accept-donation/${donationId}`, {}, { headers: authHeader() });
  }
}

export default new UserService();
