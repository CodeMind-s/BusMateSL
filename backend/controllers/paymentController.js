import Payment from "../models/paymentModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

// @desc    Create a new Payment
// @route   POST /api/payments
const createPayment = asyncHandler(async (req, res) => {
  const { bookingId, amount } = req.body;

  const payment = new Payment({
    userId: req.user._id,
    bookingId,
    amount,
    date: new Date(),
  });

  const createdPayment = await payment.save();
  res.status(201).json(createdPayment);
});

// @desc    Get all payments for a user
// @route   GET /api/payments/user/:userId
const getPaymentByUser = asyncHandler(async (req, res) => {
    const payments = await Payment.find({userId: req.user._id})
      .populate("userId", "name email contact")
      .populate("bookingId");
  
    if (payments.length > 0) {
      res.status(200).json(payments);
    } else {
      res.status(404).json({ message: "No payments found for this user" });
    }
  });

// @desc    Get a schedule by ID
// @route   GET /api/schedules/:id
const getPaymentById = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id)
  .populate("userId", "name email contact")
  .populate("bookingId");

  if (payment) {
    res.status(200).json(payment);
  } else {
    res.status(404).json({ message: "Payment not found" });
  }
});

// @desc    Update a payment
// @route   PUT /api/paymentss/:id
const updatePayment = asyncHandler(async (req, res) => {
  const { userId, bookingId, amount, date} = req.body;

  const payment = await Payment.findById(req.params.id);

  if (payment) {
    payment.userId = userId || payment.userId;
    payment.bookingId = bookingId || payment.bookingId;
    payment.amount = amount || payment.amount;
    payment.date = date || payment.date;

    const updatedPayment = await payment.save();
    res.status(200).json(updatedPayment);
  } else {
    res.status(404).json({ message: "Payment not found" });
  }
});

// @desc    Delete a payment
// @route   DELETE /api/payments/:id
const deletePayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);

  if (payment) {
    await payment.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Payment removed" });
  } else {
    res.status(404).json({ message: "Payment not found" });
  }
});

export {
    createPayment,
    getPaymentById,
    updatePayment,
    deletePayment,
    getPaymentByUser
};
