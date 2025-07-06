import { Router } from "express";
import {
  getHome,
  getAboutUser,
  getProjectsUser,
  getInTouch,
  addMessage,
} from "../controller/adminController";
import { validateRequest } from "../middlewares/validateRequest";
import { messageSchema } from "../validators/user.validator";

const router = Router();

router.get("/getHome", getHome);
router.get("/getAbout", getAboutUser);
router.get("/getProjects", getProjectsUser);
router.get("/getInTouch", getInTouch);
router.post("/messages", validateRequest({ body: messageSchema }), addMessage);

export default router;
