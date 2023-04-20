import Router from "express"
import * as postController from "../controllers/postController.js"

const router = new Router();

router.post('/',postController.create)
router.get('/',postController.getAll)
router.get('/:id',postController.getOne)
router.delete('/:id', postController.destroy)
router.put('/:id', postController.edit)

export default router;