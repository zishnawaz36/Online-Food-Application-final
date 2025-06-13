import express from 'express';
import { GetUser } from "../controllers/Admin.js"; //always write .js

import { deleteUser } from '../controllers/Admin.js';
import { deleteManager } from '../controllers/Admin.js';
const AdminRoute = express.Router();

//if admin then get all data 
AdminRoute.get("/getuser",GetUser);
AdminRoute.delete("/delete/:id",deleteManager);
AdminRoute.delete("/user/delete/:id",deleteUser);
export default AdminRoute;