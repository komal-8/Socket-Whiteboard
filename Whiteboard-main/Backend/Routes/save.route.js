import  express from "express";
import saveImg from "../Controller/save.controller.js";
import sendImg from "../Controller/save.controller.js";

const router=express.Router();

router.post('/save',saveImg);

router.get('/:id/show',sendImg)

export default router;