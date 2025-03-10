import { userModel } from "../model/user.model.js";

export async function createUser({ firstname, lastname, password, email }) {
    if ( !firstname || !email || !password ) {
        throw new Error('All fields are required!');
    }

    const user = userModel.create({
        fullname: {
            firstname,
            lastname,
        },
        email,
        password
    })

    return user;
}