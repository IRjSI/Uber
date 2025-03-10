import { validationResult } from "express-validator";
import { captainModel } from "../model/captain.model";
import { createCaptain } from "../services/captain.service";

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