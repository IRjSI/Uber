import { captainModel } from "../model/captain.model.js";

export async function createCaptain({ 
    firstname, 
    lastname, 
    password, 
    email,
    color,
    vehicleType,
    plate,
    capacity    
}) {
    if ( !firstname || !email || !password || !color || !vehicleType || !plate || !capacity ) {
        throw new Error('All fields are required!');
    }

    const captain = captainModel.create({
        fullname: {
            firstname,
            lastname,
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    })

    return captain;
}