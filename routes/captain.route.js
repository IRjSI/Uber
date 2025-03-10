import express from "express";
import { body } from "express-validator";
import { authCaptain } from "../middlewares/auth.middleware.js";
import { getCaptainProfile, loginCaptain, logoutCaptain, registerCaptain } from "../controllers/captain.controller.js";

const captainRouter = express.Router();

captainRouter.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('Name must be of atleast 3 chars'),
    body('password').isLength({ min: 6 }).withMessage('Password must be of atleast 6 chars'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be of atleast 3 chars'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be of atleast 3 chars'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('capacity must be of atleast 1'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'rickshaw']).withMessage('Invalid vehicle type'),
], registerCaptain);

captainRouter.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be of atleast 6 chars'),
], loginCaptain);

captainRouter.get('/profile', authCaptain, getCaptainProfile);

captainRouter.get('/logout', authCaptain, logoutCaptain);

export { captainRouter };