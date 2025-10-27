import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please enter a username"],
        unique: [true, "Username already exists"]
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, "Please enter an password"],
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;