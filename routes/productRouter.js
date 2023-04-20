import Router from "express"
import * as productController from "../controllers/productController.js"

const router = new Router();

router.post('/',productController.create)
router.get('/',productController.getAll)
router.get('/:id',productController.getOne)
router.delete('/:id', productController.destroy)
router.put('/:id', productController.edit)

export default router;