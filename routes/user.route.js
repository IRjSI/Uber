import express from "express";
import { body } from "express-validator";
import { registerUser } from "../controllers/user.controller";

const router = express.Router();

router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname'),isLength({ min: 3 }).withMessage('Name must be of atleast 3 chars'),
    body('password').isLength({ min: 6 }).withMessage('Password must be of atleast 6 chars')
], registerUser);

export { router };