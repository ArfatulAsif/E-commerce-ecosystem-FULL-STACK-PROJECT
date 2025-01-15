const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, Product, Order, UserBank, Transaction, Chat} = require('../schema/schema');
const dotenv = require("dotenv");
dotenv.config();




exports.signUp = async (req, res) => {
  try {
    const { email, password, userType, bankAccountNumber } = req.body;

    

    //Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    

    // Save the user with hashed password
    const user = new User({ email, password: hashedPassword, userType, bankAccountNumber });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.login = async (req, res) => {
  try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user._id, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({ token,  userType: user.userType });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

exports.addProduct = async (req, res) => {
  const { productName, price, stock, description, category, images } = req.body;

  // Get supplierId from req.user set by the middleware
  const supplierId = req.user._id;

  // Validation (You can expand the validation as per your needs)
  if (!supplierId || !productName || !price || !stock || !description || !category || !images) {
      return res.status(400).json({ error: 'All fields are required' });
  }

  try {
      const newProduct = new Product({
          supplierId,
          productName,
          price,
          stock,
          description,
          category,
          images
      });

      await newProduct.save();

      return res.status(201).json(newProduct);
  } catch (error) {
      console.error('Error adding product:', error);
      return res.status(500).json({ error: 'Error adding product' });
  }
};


exports.getAllProducts = async (req, res) => {
  try {
      // Fetch all products from the database
      const products = await Product.find();

      // Send the retrieved products as a response
      res.status(200).json(products);
  } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Error fetching products' });
  }
};



exports.addToCart = async (req, res) => {
  try {
      const { productId } = req.body;

      const product = await Product.findById(productId);

      const supplierId  = product.supplierId;

      const numberOfItems = 1; // it is defaultly set to 1
      const deliveryAddress = "Akhalia Sust, Sylhet 3100";



      if (!supplierId || !productId || !numberOfItems || !deliveryAddress) {
          return res.status(400).json({ error: 'All fields are required' });
      }

     

      if (!product) {
          return res.status(404).json({ error: 'Product not found' });
      }

      if (product.stock < numberOfItems) {
          return res.status(400).json({ error: 'Insufficient stock available' });
      }

      const paymentAmount = product.price * numberOfItems;

      product.stock -= numberOfItems;
      product.totalSold += numberOfItems;
      await product.save();

      const newOrder = new Order({
          customerId: req.user._id,
          supplierId,
          productId,
          numberOfItems,
          deliveryAddress,
          status: 'carted',
          paymentAmount,
      });

      await newOrder.save();

      res.status(201).json({ message: 'Item added to cart successfully', order: newOrder });
  } catch (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).json({ error: 'Server error' });
  }
};






exports.buy = async (req, res) => {
  try {
      const { bankAccountNumber, password } = req.body;

      // Get customer ID from request user
      const customerId = req.user._id;

      // Find customer's bank account
      const userBank = await UserBank.findOne({ accountNumber: bankAccountNumber });

      if (!userBank) {
          return res.status(400).json({ error: 'Invalid bank account' });
      }

      // Verify the provided password
      if (userBank.password !== password) {
          return res.status(400).json({ error: 'Incorrect password' });
      }

      // Fetch all carted orders for the customer
      const cartedOrders = await Order.find({ customerId, status: 'carted' });

      if (cartedOrders.length === 0) {
          return res.status(404).json({ error: 'No carted orders found' });
      }

      // Calculate total payment amount
      const totalAmount = cartedOrders.reduce((sum, order) => sum + order.paymentAmount, 0);

      if (userBank.balance < totalAmount) {
          return res.status(400).json({ error: 'Insufficient balance' });
      }

      // Deduct amount from customer's bank account
      userBank.balance -= totalAmount;
      await userBank.save();

      // Transfer the amount to supplier bank accounts and create transactions
      for (const order of cartedOrders) {
          const supplierUser = await User.findById(order.supplierId);
          if (supplierUser && supplierUser.bankAccountNumber) {
              const supplierBank = await UserBank.findOne({ accountNumber: supplierUser.bankAccountNumber });

              if (supplierBank) {
                  supplierBank.balance += order.paymentAmount; // Increase supplier balance
                  await supplierBank.save();

                  const transaction = new Transaction({
                      fromAccountNumber: bankAccountNumber,
                      toAccountNumber: supplierBank.accountNumber,
                      amount: order.paymentAmount,
                  });

                  await transaction.save();
              }
          }

          // Update order status to 'pending'
          order.status = 'pending';
          await order.save();
      }

      res.status(200).json({ message: 'Purchase successful', totalAmount });
  } catch (error) {
      console.error('Error processing purchase:', error);
      res.status(500).json({ error: 'Server error' });
  }
};







// Bank 
exports.addBankAccount = async (req, res) => {
    try {
        const { account_type, accountNumber, password, balance } = req.body;

        // Validation
        if (!account_type || !accountNumber || !password) {
            return res.status(400).json({ error: 'Account type, account number, and password are required' });
        }

        // Check if the account number already exists
        const existingAccount = await UserBank.findOne({ accountNumber });
        if (existingAccount) {
            return res.status(400).json({ error: 'Account number already exists' });
        }

        // Create new bank account
        const newAccount = new UserBank({
            account_type,
            accountNumber,
            password,
            balance: balance || 0,  // Default balance is 0 if not provided
        });

        await newAccount.save();

        res.status(201).json({ message: 'Bank account added successfully', account: newAccount });
    } catch (error) {
        console.error('Error adding bank account:', error);
        res.status(500).json({ error: 'Server error' });
    }
};



exports.deliverProduct = async (req, res) => {
  try {
      const { orderId } = req.body;

      // Fetch order by ID
      const order = await Order.findById(orderId);

      if (!order) {
          return res.status(404).json({ error: 'Order not found' });
      }

      // Get supplier ID from middleware
      const supplierId = req.user._id;

      // Find supplier's bank account using supplier ID
      const supplierUser = await User.findById(supplierId);
      const supplierBank = await UserBank.findOne({ accountNumber: supplierUser.bankAccountNumber });

      if (!supplierBank) {
          return res.status(400).json({ error: 'Invalid supplier bank account' });
      }

      // Deduct 20% of the order amount from supplier's bank balance
      const commission = order.paymentAmount * 0.2;
      supplierBank.balance -= commission;
      await supplierBank.save();

      // Add the commission amount to the admin's bank balance
      const adminBank = await UserBank.findOne({ accountNumber: '1234567890' });

      if (adminBank) {
          adminBank.balance += commission;
          await adminBank.save();
      }

      // Update order status to 'delivered'
      order.status = 'delivered';
      await order.save();

      // Log the transaction
      const transaction = new Transaction({
          fromAccountNumber: supplierBank.accountNumber,
          toAccountNumber: adminBank.accountNumber,
          amount: commission,
      });

      await transaction.save();

      res.status(200).json({ message: 'Order delivered successfully', commission });
  } catch (error) {
      console.error('Error delivering product:', error);
      res.status(500).json({ error: 'Server error' });
  }
};




// get cart 
exports.getCart = async (req, res) => {
  try {
      // Get customer ID from middleware
      const customerId = req.user._id;

      // Fetch all carted orders for the customer
      const cartedOrders = await Order.find({ customerId, status: 'carted' });

      if (cartedOrders.length === 0) {
          return res.status(404).json({ message: 'No carted orders found' });
      }

      res.status(200).json(cartedOrders);
  } catch (error) {
      console.error('Error fetching carted orders:', error);
      res.status(500).json({ error: 'Server error' });
  }
};





exports.getAllOrdersForCustomer = async (req, res) => {
    try {
        // Get customer ID from middleware
        const customerId = req.user._id;

        // Fetch all orders for the customer
        const orders = await Order.find({ customerId });

        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }

        // Calculate total items and total amount spent
        const totalItems = orders.reduce((sum, order) => sum + order.numberOfItems, 0);
        const totalAmountSpent = orders.reduce((sum, order) => sum + order.paymentAmount, 0);

        res.status(200).json({
            orders,
            totalItems,
            totalAmountSpent
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Server error' });
    }
};





exports.getAllPendingOrdersForSupplier = async (req, res) => {
    try {
        // Get supplier ID from middleware
        const supplierId = req.user._id;

        // Fetch all pending orders for the supplier
        const pendingOrders = await Order.find({ supplierId, status: 'pending' });

        if (pendingOrders.length === 0) {
            return res.status(404).json({ message: 'No pending orders found' });
        }

        // Calculate total items and total amount earned
        const totalItems = pendingOrders.reduce((sum, order) => sum + order.numberOfItems, 0);
        const totalAmountEarned = pendingOrders.reduce((sum, order) => sum + order.paymentAmount, 0);

        res.status(200).json({
            pendingOrders,
            totalItems,
            totalAmountEarned
        });
    } catch (error) {
        console.error('Error fetching pending orders:', error);
        res.status(500).json({ error: 'Server error' });
    }
};




exports.getAllDeliveredOrdersForSupplier = async (req, res) => {
    try {
        // Get supplier ID from middleware
        const supplierId = req.user._id;

        // Fetch all delivered orders for the supplier
        const deliveredOrders = await Order.find({ supplierId, status: 'delivered' });

        if (deliveredOrders.length === 0) {
            return res.status(404).json({ message: 'No delivered orders found' });
        }

        // Calculate total items and total amount earned
        const totalItems = deliveredOrders.reduce((sum, order) => sum + order.numberOfItems, 0);
        const totalAmountEarned = deliveredOrders.reduce((sum, order) => sum + order.paymentAmount, 0);

        res.status(200).json({
            deliveredOrders,
            totalItems,
            totalAmountEarned
        });
    } catch (error) {
        console.error('Error fetching delivered orders:', error);
        res.status(500).json({ error: 'Server error' });
    }
};




exports.getAllOrders = async (req, res) => {
    try {
        // Fetch all orders
        const orders = await Order.find();

        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }

    

        // Calculate 20% commission for all delivered orders
        const deliveredOrders = orders.filter(order => order.status === 'delivered');
        const totalCommission = deliveredOrders.reduce((sum, order) => sum + (order.paymentAmount * 0.2), 0);

        res.status(200).json({
            orders,
            totalCommission
        });
    } catch (error) {
        console.error('Error fetching all orders:', error);
        res.status(500).json({ error: 'Server error' });
    }
};




exports.postTransactionsByAccount = async (req, res) => {
    try {
        const { accountNumber, password } = req.body;

        // Find the user's bank account by account number
        const userBank = await UserBank.findOne({ accountNumber });

        if (!userBank) {
            return res.status(400).json({ error: 'Invalid account number' });
        }

        // Verify the provided password
        if (userBank.password !== password) {
            return res.status(400).json({ error: 'Incorrect password' });
        }

        // Fetch debit transactions
        const debitTransactions = await Transaction.find({ fromAccountNumber: accountNumber });

        // Fetch credit transactions
        const creditTransactions = await Transaction.find({ toAccountNumber: accountNumber });

        if (debitTransactions.length === 0 && creditTransactions.length === 0) {
            return res.status(404).json({ error: 'No transactions found' });
        }

        // Calculate total debit and credit amounts
        const totalDebit = debitTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
        const totalCredit = creditTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);

        // Current balance is calculated by subtracting total debits from total credits
        const currentBalance = userBank.balance;

        res.status(200).json({ 
            debits: debitTransactions, 
            credits: creditTransactions, 
            totalDebit, 
            totalCredit, 
            currentBalance 
        });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Server error' });
    }
};




exports.ProductById = async (req, res) => {
    try {
        const productId = req.body; // Get the product ID from request body

        

        const product = await Product.findById(productId.productId); // Find the product by ID

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
};





