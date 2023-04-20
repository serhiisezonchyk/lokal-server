import Router from "express"
import * as productCategoryController from "../controllers/productCategoryController.js"

const router = new Router();

router.post('/',productCategoryController.create)
router.get('/',productCategoryController.getAll)
router.get('/:id',productCategoryController.getOne)
router.delete('/:id', productCategoryController.destroy)
router.put('/:id', productCategoryController.edit)

export default router;