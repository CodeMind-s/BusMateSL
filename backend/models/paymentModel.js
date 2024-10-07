import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Booking',
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    },
    { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
