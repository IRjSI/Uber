import { validationResult } from "express-validator";
import { captainModel } from "../model/captain.model.js";
import { createCaptain } from "../services/captain.service.js";
import { BlackListTokenModel } from "../model/blackListToken.model.js";

export async function registerCaptain(req,res,next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptainAlreadyRegistered = await captainModel.findOne({email});
    if (isCaptainAlreadyRegistered) {
        return res.status(400).json({ message: 'Captain already registered' })
    }

    const hashPassword = await captainModel.hashPassword(password);

    const captain = await createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
    })

    const token = captain.generateAuthToken();

    res.status(200).json({ token, captain });

}

export async function loginCaptain(req,res,next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(400).json({ message: 'invalid email or password' });
    }
    
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(400).json({ message: 'invalid email or password' });
    }

    const token = captain.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, captain });
}

export async function getCaptainProfile(req,res) {
    res.status(200).json(req.captain);
}

export async function logoutCaptain(req,res) {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    await BlackListTokenModel.create({token});

    res.clearCookie('token');

    res.status(200).json({ message: 'logged out' });
}