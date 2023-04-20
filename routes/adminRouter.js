import Router from "express"
import * as adminController from "../controllers/adminController.js"
import authMiddleware from "../middleware/auth.js";

const router = new Router();

router.post('/create',adminController.create);
router.post('/login',adminController.login);
router.get('/auth',authMiddleware, adminController.check);
router.get('/', adminController.getAll);
router.delete('/:id', adminController.destroy);

export default router;