# E-COMMERCE ECOSYSTEM

<img src = "images_core/LEVEL UP logo.png">
<br>

# PROJECT INTRODUCTION

This project simulates an e-commerce ecosystem that includes a gaming-themed website called **LEVEL UP**, and a **Bank** to handle all financial transactions. The website allows users to purchase gaming products based on their experience level, starting with beginner items like gaming mice, keyboards, and controllers, progressing to intermediate products like gaming displays, and finally advanced equipment such as VR headsets and steering wheels.

The system supports both suppliers and customers. Suppliers can create accounts, add their products, and supply them to customers. Customers can browse and purchase products while making payments through the integrated bank system. After a purchase, suppliers fulfill the orders and pay 20% of their earnings to the e-commerce platform as a commission. Both suppliers and customers must link their bank accounts during signup to facilitate transactions.

The **Bank** operates as a separate entity, managing all transactions between the parties. Users can log in to the bank system to view their transaction history, including credits and debits. All interactions between the e-commerce platform, suppliers, and the bank are carried out using APIs, ensuring smooth functionality across the ecosystem.

This project focuses on simulating the core functionality of an e-commerce system, showcasing the interaction between users, suppliers, and a bank in an organized setup.

<br>
<br>

## Technologies Used  

### Frontend  
- ![HTML](https://img.icons8.com/color/48/000000/html-5.png) **HTML**: To structure the web content.
- ![CSS](https://img.icons8.com/color/48/000000/css3.png) **CSS**: For styling the web project.
- ![React.js](https://img.icons8.com/color/48/000000/react-native.png) **React.js**: For building the user interface of the e-commerce website.
- ![React Router](https://i.ibb.co/19d5sDG/react-router-svg.png) **React Router**: For declarative routing in React applications.
- ![Tailwind CSS](https://img.icons8.com/color/48/000000/tailwindcss.png) **Tailwind CSS**: A utility-first CSS framework for designing responsive and modern UI components.  
- ![DaisyUI](https://img.icons8.com/?size=100&id=RPyoS0c4Zki1&format=png&color=000000) **DaisyUI**: A Tailwind CSS-based UI framework to enhance styling with prebuilt components.  

### Backend  

- ![Node.js](https://img.icons8.com/color/48/000000/nodejs.png) **Node.js**: To handle server-side logic and API integration.  
- ![Express.js](https://cdn.icon-icons.com/icons2/2699/PNG/48/expressjs_logo_icon_169185.png) **Express.js**: For creating and managing backend services and APIs.  
- ![JWT](https://img.icons8.com/?size=48&id=rHpveptSuwDz&format=png) **JSON Web Token (JWT)**: To secure user authentication and authorization.  

### Database  

- ![MongoDB](https://img.icons8.com/color/48/000000/mongodb.png) **MongoDB**: A NoSQL database for managing user, product, and transaction data.  

<br>


# Activity Diagram

<img src="images_core/Activity_diagram.png">

<br>

# Core Features

<br>

# LEVEL UP 

## 1. **Authentication**  
- **Login & Signup**: Secure user registration and login for customers, suppliers, admins, and bank users.  
- **Session Management**: Protect all user sessions and API access with JWT authentication.  

<img src="images_core/1.png">  
<img src="images_core/2.png">  

## 2. **Home Page**  
- **Product Showcase**: Displays all available products categorized by user experience level (Beginner, Intermediate, Expert).  
- **Responsive Design**: User-friendly interface across all devices.  

<img src="images_core/3.gif">  

## 3. **Shop Page**  
- **Product Browsing**: Logged-in customers can view and select products for purchase.  
- **Product Details**: Includes price, description, and quantity options.  

<img src="images_core/4.png"> 

## 4. **Product Page**  
- **Product View & Add to cart**: View product in detail and add to cart

<img src="images_core/4_4.png"> 

## 5. **Cart Management**  
- **Cart Page**: Shows all items added to the cart with options to update quantity or remove items.  

<img src="images_core/5.png">  

## 6. **Payment Gateway**  
- **Bank Integration**: Customers enter their bank number and password to complete purchases securely.  
- **Transaction Validation**: Ensures funds are debited correctly, with a success or failure message displayed to the user.  

<img src="images_core/6.png">  

## 7. **Dashboards**  

### Customer Dashboard  
- **Order History**: Displays all purchased products with status (Pending or Delivered).  

<img src="images_core/7.png">  

### Supplier Dashboard  
- **Order Management**: Shows all pending and delivered orders for the supplier.  

<img src="images_core/8.png">  

### Admin Dashboard  
- **System Logs**: Displays all transactions, user activity, and system interactions for monitoring.  

<img src="images_core/9.png">  

<br>

# AIA BANK

The **Bank** is a seperate identity, access it via **/bank** address, example **http://localhost:5173/bank**.

## 8. **Bank System**  

### Bank Login Page  
- **User Access**: Secure login for bank account holders.  

<img src="images_core/10.png">  

### Transaction Page  
- **Transaction History**: Displays all debits, credits, and current balance for the logged-in user.  

<img src="images_core/11.png">  

<br>

# Database Schema

<img src="images_core/Database.png"> 

<br>


# Manual Setup 🧑‍💻

Clone this repo and create a `.env` file at the backend folder

```
PORT=8000
JWT_SECRET=
MONGO_DB=
```

Create `customer` or `supplier` type of user using the system. Create `admin` type of user, using the `signup` api and manually entering user type as `admin`.
Start using the system.

## Backend:

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Frontend:

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

