import Router from "express"
import * as partnerController from "../controllers/partnerController.js"

const router = new Router();

router.post('/',partnerController.create)
router.get('/',partnerController.getAll)
router.get('/:id',partnerController.getOne)
router.delete('/:id', partnerController.destroy)
router.put('/:id', partnerController.edit)

export default router;