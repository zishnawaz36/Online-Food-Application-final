import express, { Router } from 'express';
import { createManager, createRestaurant, getManagers, getRestaurants, register} from '../controllers/Auth.js';
import { login } from '../controllers/Auth.js';
import { logout } from '../controllers/Auth.js';
import { CreateAddress, getAddress } from '../controllers/Address.js';
import { admin } from '../controllers/Authpanel.js';
import { manager } from '../controllers/Authpanel.js';
import { user } from '../controllers/Authpanel.js';
import verifyToken from "../Middleware/verifyToken.js";
import roleBased from '../Middleware/roleBased.js';


const Authroute = express.Router();
Authroute.post("/register",register);
Authroute.post("/login",login);
Authroute.post("/logout",logout);
Authroute.post("/manager",createManager);
Authroute.post("/restaurant",createRestaurant);
Authroute.get("/getmanagers",getManagers);
Authroute.get("/getrestaurants",getRestaurants);
Authroute.post("/address",CreateAddress);
Authroute.get("/getaddress",getAddress);
Authroute.post("/admin", verifyToken, roleBased("admin"), admin);
Authroute.post("/user", verifyToken, roleBased("user"), user);
Authroute.post("/manager", verifyToken, roleBased("manager"), manager);
export default Authroute;