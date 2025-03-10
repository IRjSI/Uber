import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    fullname: {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    // for location tracking
    socketId: { 
        type: String
    }
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h'});
    return token;
}

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password,10);
}

const userModel = mongoose.model('user', userSchema);

export {userModel};