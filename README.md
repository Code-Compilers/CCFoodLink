# 🌍 **Food & Donation Platform** 🍞

A scalable, secure platform connecting food donors (restaurants, supermarkets) with donatees/recipients (NGOs, individuals) to facilitate surplus food donations. This platform aims to reduce food insecurity and waste in South Africa by enabling real-time donations, waste tracking, environmental impact calculations, and educational resources.

## 📋 **Features**
- **👥 Users:** Role-based access for registration and login.
- **📝 Register:** Registration form for new users.
- **🔑 Login:** Login form for returning users.
- **🏠 Dashboard:** Homepage/welcome page for users.
- **🍲 Donor:** Input to donate food to NGOs.
- **🥕 Donatee/Recipient:** Input to receive food donations.
- **🍽️ Food Listings:** Donors and recipients can add/edit/delete food donations.

## 🏗️ **System Architecture**
- **Frontend:** React.js and CSS
- **Backend:** Spring Boot (Java 17+) with RESTful APIs
- **Database:** MySQL 8.x

## 🧩 **System Components**
### Frontend
- **🔑 Role Management**
- **🍛 Food Listing & Search**
- **📱 Responsive UI for Mobile & Desktop**

### Backend
- **🌐 REST API for User, Food, and Transaction Management**
- **🔒 Security:** Spring Security

### Database
- **Tables:**
  - `users`: Stores user data.
  - `food_listings`: Tracks food donations.
  - `transactions`: Logs claims.

### External Services
- **📊 Database:** For storing user information and content.

## ⚙️ **Modules**
### 1. User Management
- Registration and login.

### 2. Food Listing & Search
- Donors add/edit food, recipients search by type.

### 3. Claim & Transaction
- Recipients claim food, donors receive notifications, and transaction history is saved.

## 🚀 **Performance & Security**
- Supports 100 concurrent users.

## ✅ **Requirements**
- **FR1:** Register or Login.
- **FR2:** Donater/Donatee form.
- **FR3:** List of Donaters information and food.
- **FR4:** List of Donatee information.
- **FR5:** Real-time donation board.
- **FR6:** Save food data.

## 🛠️ **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/Code-Compilers/CCFoodLink.git
