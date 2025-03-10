import express from "express";
import { body } from "express-validator";
import { getuserProfile, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('Name must be of atleast 3 chars'),
    body('password').isLength({ min: 6 }).withMessage('Password must be of atleast 6 chars')
], registerUser);

userRouter.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('not long enough')
], loginUser)

userRouter.get('/profile', authUser, getuserProfile)

userRouter.get('/logout', logoutUser)

export { userRouter };