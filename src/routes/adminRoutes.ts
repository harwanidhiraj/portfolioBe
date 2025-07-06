import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest";
import {
  experienceSchema,
  loginSchema,
  messageSchema,
  projectSchema,
  skillSchema,
  updateAboutSchema,
  updateExperienceSchema,
  updateGetInTouchSchema,
  updateProfileSchema,
  updateSkillSchema,
} from "../validators/user.validator";
import {
  addExperience,
  addMessage,
  addSkill,
  createProject,
  deleteExperience,
  deleteProject,
  deleteSkill,
  getAbout,
  getAllExperiences,
  getAllSkills,
  getExperienceById,
  getGetInTouch,
  getMessages,
  getProfile,
  getProjectById,
  getProjects,
  getSkillById,
  loginUser,
  updateAbout,
  updateExperience,
  updateGetInTouch,
  updateProfile,
  updateProject,
  updateSkill,
} from "../controller/adminController";
import rateLimit from "express-rate-limit";
import { authenticate } from "../middlewares/authentication";
import multer from "multer";
import path from "path";

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Only allow 5 login attempts per IP
  message: "Too many login attempts, please try again after 15 minutes.",
  standardHeaders: true,
  legacyHeaders: false,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

const upload = multer({ storage });

router.post(
  "/login",
  loginLimiter,
  validateRequest({ body: loginSchema }),
  loginUser
);

router.get("/profile", authenticate, getProfile);

router.put(
  "/profile",
  authenticate,
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  validateRequest({ body: updateProfileSchema }),
  updateProfile
);

router.get("/about", authenticate, getAbout);

router.put(
  "/about",
  authenticate,
  validateRequest({ body: updateAboutSchema }),
  updateAbout
);

router.get("/skills", authenticate, getAllSkills);
router.get("/skills/:id", authenticate, getSkillById);
router.put(
  "/skills/:id",
  authenticate,
  validateRequest({ body: updateSkillSchema }),
  updateSkill
);
router.delete("/skills/:id", authenticate, deleteSkill);

router.get("/experiences", authenticate, getAllExperiences);
router.get("/experiences/:id", authenticate, getExperienceById);
router.put(
  "/experiences/:id",
  authenticate,
  validateRequest({ body: updateExperienceSchema }),
  updateExperience
);
router.delete("/experiences/:id", authenticate, deleteExperience);

router.get("/messages", authenticate, getMessages);

router.get("/getInTouch", authenticate, getGetInTouch);

router.put(
  "/getInTouch",
  authenticate,
  validateRequest({ body: updateGetInTouchSchema }),
  updateGetInTouch
);

router.get("/projects", authenticate, getProjects);
router.get("/projects/:id", authenticate, getProjectById);

router.post(
  "/projects",
  authenticate,
  upload.single("image"),
  validateRequest({ body: projectSchema }),
  createProject
);

router.put(
  "/projects/:id",
  authenticate,
  upload.single("image"),
  validateRequest({ body: projectSchema }),
  updateProject
);

router.delete("/projects/:id", authenticate, deleteProject);

router.post(
  "/skills",
  authenticate,
  validateRequest({ body: skillSchema }),
  addSkill
);

router.post(
  "/experiences",
  authenticate,
  validateRequest({ body: experienceSchema }),
  addExperience
);

export default router;
