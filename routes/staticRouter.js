import Router from "express"
import * as staticController from "../controllers/staticController.js"

const router = new Router();

router.post('/',staticController.create)
router.delete('/:fileName', staticController.destroy);


export default router;