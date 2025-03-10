import { userModel } from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BlackListTokenModel } from "../model/blackListToken.model.js";

export async function authUser(req,res,next) {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'unauth'});
    }

    const isBlacklistToken = BlackListTokenModel.findOne({token})
    if (isBlacklistToken) {
        return res.status(401).json({ message: 'unautho'})
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;

        return next();
    } catch (error) {
        return res.status(401).json({ message: error});
    }
}