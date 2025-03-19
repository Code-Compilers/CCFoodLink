# Food Waste & Donation Platform

A scalable, secure platform connecting food donors (restaurants, supermarkets) with recipients (NGOs, individuals) to facilitate surplus food donations. The Food Waste & Donation Platform aims to connect surplus food from businesses to those in need, helping reduce food insecurity and waste in South Africa. It includes features for real-time food donations, waste tracking, environmental impact calculations, and educational resources. The platform targets food-insecure individuals, businesses, NGOs, and policymakers, promoting sustainability, efficient food distribution, and policy compliance. The goal is to improve access to food, reduce waste, and support government action on food security.

## Features
- **Users:** Role-based access register and login.
- **Register:** registration form.
- **Login:** login form.
- **Dashboard:** homepage/welcome page.
- **Donor:** input to donate to NGOs.
- **Donatee/Recipient:** input to receive donations.
- **Food Listings:** Donors and Donatee/Recipient can add/edit/delete food donations.

## System Architecture
- **Frontend:** React.js and CSS
- **Backend:** Spring Boot (Java 17+) with RESTful APIs
- **Database:** MySQL 8.x
  
## System Components
### Frontend
- **Role Management**
- **Food Listing & Search**
- **Responsive UI for Mobile & Desktop**

### Backend
- **REST API for User, Food, and Transaction Management**
- **Security:** Spring Security 

### Database
- **Tables:**
  - `users`: Stores user data.
  - `food_listings`: Tracks food donations.
  - `transactions`: Logs claims.

### External Services
- **Database** for storing user infomation and content.

## Modules
### 1. User Management
- Registration and login.

### 2. Food Listing & Search
- Donors add/edit food, recipients search by type.

### 3. Claim & Transaction
- Recipients claim food, donors receive notifications, and transaction history is saved.

## Performance & Security
- Supports 100 concurrent users.

## Requirements
- **FR1:** List surplus food.
- **FR2:** Real-time donation board.
- **FR3:** Save food data.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Code-Compilers/CCFoodLink.git
