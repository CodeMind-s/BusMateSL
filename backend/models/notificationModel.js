import mongoose from "mongoose";

const notificationSchema = mongoose.Schema({
    busId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Bus',
    },
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
},
    { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
