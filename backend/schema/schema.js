const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, enum: ['admin', 'supplier', 'customer'], required: true },
    bankAccountNumber: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Product Schema
const productSchema = new mongoose.Schema({
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    totalSold: { type: Number, default: 0 },
    description: { type: String, required: true },
    category: { type: String, required: true },
    images: { type: [String], required: true }
});

const Product = mongoose.model('Product', productSchema);

// Order Schema
const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    numberOfItems: {
        type: Number,
        required: true,
        min: 1,
    },
    deliveryAddress: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['carted', 'pending', 'delivered'],
        default: 'carted',
    },
    paymentAmount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.model('Order', orderSchema);

// UserBank Schema
const userBankSchema = new mongoose.Schema({
    account_type: {
        type: String,
        required: true,
        enum: ['person', 'business', 'admin'],
        default: 'person',
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
        default: 0,
    },
});

const UserBank = mongoose.model('UserBank', userBankSchema);

// Transaction Schema
const transactionSchema = new mongoose.Schema({
    fromAccountNumber: {
        type: String,
        required: true,
    },
    toAccountNumber: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Transaction = mongoose.model('Transaction', transactionSchema);


// Chat Schema
const chatSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    userMessage: { type: String, required: true },
    botReply: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = { User, Product, Order, UserBank, Transaction, Chat };
