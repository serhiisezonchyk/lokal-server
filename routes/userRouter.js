import Router from "express"
import * as userController from "../controllers/userController.js"
import authMiddleware from "../middleware/auth.js";
import { loginValidation, registerValidation } from "../validations/registerValidations.js";
import handleValidationErrors from "../middleware/handleValidationErrors.js";

const router = new Router();

router.post('/create',registerValidation,handleValidationErrors,userController.create);
router.post('/login',loginValidation,handleValidationErrors,userController.login);
router.get('/auth',authMiddleware, userController.check);
router.get('/', userController.getAll);
router.get('/:id', userController.getOne)
router.delete('/:id', userController.destroy);

export default router;