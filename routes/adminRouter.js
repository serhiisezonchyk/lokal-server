import Router from "express"
import * as adminController from "../controllers/adminController.js"
import { auth } from "../middleware/auth.js";
import {check} from "../controllers/userController.js"

const router = new Router();

router.post('/create',adminController.create);
router.post('/login',adminController.login);
router.get('/', adminController.getAll);
router.delete('/:id', adminController.destroy);

export default router;