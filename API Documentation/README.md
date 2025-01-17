# API Documentation

## Endpoints

### User Authentication

- **POST SignUP**  
  URL: `http://localhost:8000/auth/signup`  
  **Body**:  
  ```json  
  {  
    "email": "asif@gmail.com",  
    "password": "123456",  
    "userType": "admin",  
    "bankAccountNumber": "1234567890"  
  }  
  ```

- **POST SignUP Copy**  
  URL: `http://localhost:8000/auth/signup`  
  **Body**:  
  ```json  
  {  
    "email": "supplier2@gmail.com",  
    "password": "123456",  
    "userType": "supplier",  
    "bankAccountNumber": "12345678903"  
  }  
  ```

- **POST Login Customer**  
  URL: `http://localhost:8000/auth/login`  
  **Body**:  
  ```json  
  {  
    "email": "customer@gmail.com",  
    "password": "123456"  
  }  
  ```

- **POST Login Supplier**  
  URL: `http://localhost:8000/auth/login`  
  **Body**:  
  ```json  
  {  
    "email": "supplier@gmail.com",  
    "password": "123456"  
  }  
  ```

- **POST Login Admin**  
  URL: `http://localhost:8000/auth/login`  
  **Body**:  
  ```json  
  {  
    "email": "asif@gmail.com",  
    "password": "123456"  
  }  
  ```

### Product Management

- **POST add Product**  
  URL: `http://localhost:8000/product/addproduct`  
  **Headers**:  
  - Authorization: Bearer token  
  **Body**:  
  ```json  
  {  
    "productName": "Gaming Controller",  
    "price": 155,  
    "stock": 152,  
    "description": "Arrow gaming controller with hand controll",  
    "category": "Gaming Console",  
    "images": ["console.png", "console.png", "console.png"]  
  }  
  ```

- **GET Get all products**  
  URL: `http://localhost:8000/product/allproducts`

- **POST Add to Cart**  
  URL: `http://localhost:8000/product/AddToCart`  
  **Headers**:  
  - Authorization: Bearer token  
  **Body**:  
  ```json  
  {  
    "productId": "6786ad229663c2a99b4a18c0"  
  }  
  ```

- **POST Buy the cart customer**  
  URL: `http://localhost:8000/buy/buyproduct`  
  **Headers**:  
  - Authorization: Bearer token  
  **Body**:  
  ```json  
  {  
    "bankAccountNumber": "123456789001",  
    "password": "123456"  
  }  
  ```

- **POST Product by ID**  
  URL: `http://localhost:8000/product/productbyid`  
  **Body**:  
  ```json  
  {  
    "productId": "6786ad229663c2a99b4a18c0"  
  }  
  ```

### Bank and Transactions

- **POST add Bank account**  
  URL: `http://localhost:8000/bank/addaccount`  
  **Body**:  
  ```json  
  {  
    "account_type": "business",  
    "accountNumber": "1234567890",  
    "password": "123456",  
    "balance": 50000  
  }  
  ```

- **POST get all transactions**  
  URL: `http://localhost:8000/bank/transaction`  
  **Body**:  
  ```json  
  {  
    "accountNumber": "12345678901",  
    "password": "123456"  
  }  
  ```

### Order Management

- **POST Deliver product by supplier**  
  URL: `http://localhost:8000/supply/supplyproduct`  
  **Headers**:  
  - Authorization: Bearer token  
  **Body**:  
  ```json  
  {  
    "orderId": "6786ae437c1fc18e519c804b"  
  }  
  ```

- **GET Get Cart for a customer**  
  URL: `http://localhost:8000/get/getCart`  
  **Headers**:  
  - Authorization: Bearer token

- **GET Get all orders for customer dashboard**  
  URL: `http://localhost:8000/get/getAllOrdersCustomer`  
  **Headers**:  
  - Authorization: Bearer token

- **GET Get all pending orders for supplier**  
  URL: `http://localhost:8000/get/getAllPendingOrdersSupplier`  
  **Headers**:  
  - Authorization: Bearer token

- **GET Get all delivered orders for supplier**  
  URL: `http://localhost:8000/get/getAllDeliveredOrdersSupplier`  
  **Headers**:  
  - Authorization: Bearer token

- **GET Get all orders for admin dashboard**  
  URL: `http://localhost:8000/get/getAllOrders`  
  **Headers**:  
  - Authorization: Bearer token

