import { validationResult } from "express-validator";
import { userModel } from "../model/user.model.js";
import { createUser } from "../services/user.service.js";
import cookie from "cookie-parser";
import { BlackListTokenModel } from "../model/blackListToken.model.js";

export async function registerUser(req,res,next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;
    const hashPassword = await userModel.hashPassword(password);

    const user = await createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword
    })

    const token = user.generateAuthToken();

    res.status(200).json({ token, user });

}

export async function loginUser(req,res,next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
    }

    const isMatch = user.comparePassword(password);
    if (!isMatch) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
    }

    const token = user.generateAuthToken();

    res.cookie('token', token); // set token in cookie

    res.status(200).json({ token,user })
}

export async function getuserProfile(req,res,next) {
    res.status(200).json(req.user); // from auth middleware
}

export async function logoutUser(req,res,next) {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1] // now blacklist this
    await BlackListTokenModel.create({ token });

    res.status(200).json({ message: 'Logged out' })
}