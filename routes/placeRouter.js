import Router from "express"
import * as placeController from "../controllers/placeController.js"

const router = new Router();

router.post('/',placeController.create)
router.get('/',placeController.getAll)
router.get('/:id',placeController.getOne)
router.delete('/:id', placeController.destroy)
router.put('/:id', placeController.edit)

export default router;