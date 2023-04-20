import Router from "express"
import * as postCategoryController from "../controllers/postCategoryController.js"

const router = new Router();

router.post('/',postCategoryController.create)
router.get('/',postCategoryController.getAll)
router.get('/:id',postCategoryController.getOne)
router.delete('/:id', postCategoryController.destroy)
router.put('/:id', postCategoryController.edit)

export default router;