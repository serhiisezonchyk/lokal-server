import Router from "express"

import adminRouter from "./adminRouter.js"
import partnerRouter from "./partnerRouter.js"
import placeRouter from "./placeRouter.js"
import postCategoryRouter from "./postCategoryRouter.js"
import postRouter from "./postRouter.js"
import productCategoryRouter from "./productCategoryRouter.js"
import productRouter from "./productRouter.js"
import userRouter from "./userRouter.js"
import staticRouter from "./staticRouter.js"
const router = new Router();

router.use('/admin', adminRouter);
router.use('/partner',partnerRouter);
router.use('/place',placeRouter);
router.use('/postCategory',postCategoryRouter);
router.use('/post',postRouter);
router.use('/productCategory',productCategoryRouter);
router.use('/product',productRouter);
router.use('/user',userRouter);
router.use('/static', staticRouter)

export default router;