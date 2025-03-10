import { validationResult } from "express-validator";
import { userModel } from "../model/user.model.js";
import { createUser } from "../services/user.service.js";

export async function registerUser(req,res,next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, email, password } = req.body;
    const hashPassword = await userModel.hashPassword(password);

    const user = await createUser({
        firstname,
        lastname,
        email,
        password: hashPassword
    })

    const token = user.generateAuthToken();

    res.status(200).json({ token, user });

}