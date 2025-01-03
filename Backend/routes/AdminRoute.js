import express from 'express';
import { GetUser } from "../controllers/Admin.js"; //always write .js
import { isAdmin } from '../Middleware/verifyToken.js';
import { deleteUser } from '../controllers/Admin.js';

const AdminRoute = express.Router();

//if admin then get all data 
AdminRoute.get("/getuser",isAdmin,GetUser);
AdminRoute.post("/delete/:id",isAdmin,deleteUser);
export default AdminRoute;