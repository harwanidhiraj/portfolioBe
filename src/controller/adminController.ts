import { COMMON_MESSAGES } from "../constants/messages";
import {
  addExperienceService,
  addMessageService,
  addSkillService,
  createProjectService,
  deleteExperienceService,
  deleteProjectService,
  deleteSkillService,
  getAboutService,
  getAllExperiencesService,
  getAllSkillsService,
  getExperienceByIdService,
  getGetInTouchService,
  getMessagesService,
  getProjectByIdService,
  getProjectsService,
  getSkillByIdService,
  login,
  profile,
  updateAboutService,
  updateExperienceService,
  updateGetInTouchService,
  updateProfileService,
  updateProjectService,
  updateSkillService,
} from "../services/adminService";
import { HttpStatus } from "../utils/httpStatus";
import { successResponse } from "../utils/responseHelper";
import { Request, Response } from "express";
import { uploadToCloudinary } from "./fileController";
import { sendMail } from "../utils/mailer";

export const loginUser = async (req: Request, res: Response) => {
  const admin = await login(req, res);
  successResponse(
    res,
    HttpStatus.OK,
    true,
    COMMON_MESSAGES.ADMIN_LOGIN,
    admin.plainUser,
    { token: admin?.token }
  );
};

export const getProfile = async (req: Request, res: Response) => {
  const admin = await profile();
  successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.SUCCESS, admin);
};

export const updateProfile = async (req: Request, res: Response) => {
  const { name, roles, description } = req.body;

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const resumeFile = files?.resume?.[0];
  const imageFile = files?.image?.[0];

  const updated = await updateProfileService({
    name,
    roles,
    description,
    resumeFile,
    imageFile,
  });

  successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.SUCCESS, updated);
};

export const getAbout = async (req: Request, res: Response) => {
  const about = await getAboutService();
  successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.SUCCESS, about);
};

export const updateAbout = async (req: Request, res: Response) => {
  const { description } = req.body;
  const updated = await updateAboutService({ description });
  successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.SUCCESS, updated);
};

export const getAllSkills = async (req: Request, res: Response) => {
  const skills = await getAllSkillsService();
  successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.SUCCESS, skills);
};

export const getSkillById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const skill = await getSkillByIdService(Number(id));
  successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.SUCCESS, skill);
};

export const updateSkill = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, iconName } = req.body;
  const updated = await updateSkillService(Number(id), { name, iconName });
  successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.SUCCESS, updated);
};

export const deleteSkill = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteSkillService(Number(id));
  successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.SUCCESS, null);
};

export const getAllExperiences = async (req: Request, res: Response) => {
  const experiences = await getAllExperiencesService();
  successResponse(
    res,
    HttpStatus.OK,
    true,
    COMMON_MESSAGES.SUCCESS,
    experiences
  );
};

export const getExperienceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const experience = await getExperienceByIdService(Number(id));
  successResponse(
    res,
    HttpStatus.OK,
    true,
    COMMON_MESSAGES.SUCCESS,
    experience
  );
};

export const updateExperience = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await updateExperienceService(Number(id), req.body);
  successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.SUCCESS, updated);
};

export const deleteExperience = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteExperienceService(Number(id));
  successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.SUCCESS, null);
};

export const getMessages = async (req: Request, res: Response) => {
  const messages = await getMessagesService();
  successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.SUCCESS, messages);
};

export const getGetInTouch = async (req: Request, res: Response) => {
  const data = await getGetInTouchService();
  successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.SUCCESS, data);
};

export const updateGetInTouch = async (req: Request, res: Response) => {
  const { email, phone, address } = req.body;
  const result = await updateGetInTouchService({ email, phone, address });
  successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.SUCCESS, result);
};

export const createProject = async (req: Request, res: Response) => {
  const { title, gitHubUrl, liveUrl, tech, description } = req.body;
  const file = req.file;

  let imageUrl = "";
  if (file) {
    const upload = await uploadToCloudinary(file.path, "projects");
    imageUrl = upload.secure_url;
  }

  const project = await createProjectService({
    title,
    gitHubUrl,
    liveUrl,
    imageUrl,
    tech,
    description,
  });

  successResponse(
    res,
    HttpStatus.CREATED,
    true,
    COMMON_MESSAGES.SUCCESS,
    project
  );
};

export const getProjects = async (req: Request, res: Response) => {
  const projects = await getProjectsService();
  successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.SUCCESS, projects);
};

export const getProjectById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const project = await getProjectByIdService(Number(id));
  successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.SUCCESS, project);
};

export const updateProject = async (req: Request, res: Response) => {
  const { title, gitHubProfile, liveUrl, tech, description } = req.body;
  const file = req.file;
  const { id } = req.params;

  let imageUrl = undefined;
  if (file) {
    const upload = await uploadToCloudinary(file.path, "projects");
    imageUrl = upload.secure_url;
  }

  const project = await updateProjectService(Number(id), {
    title,
    gitHubProfile,
    liveUrl,
    tech,
    description,
    ...(imageUrl && { imageUrl }),
  });

  successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.SUCCESS, project);
};

export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteProjectService(Number(id));
  successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.SUCCESS, null);
};

export const addSkill = async (req: Request, res: Response) => {
  const { name, iconName } = req.body;
  const skill = await addSkillService({ name, iconName });
  successResponse(
    res,
    HttpStatus.CREATED,
    true,
    COMMON_MESSAGES.SUCCESS,
    skill
  );
};

export const addExperience = async (req: Request, res: Response) => {
  const experience = await addExperienceService(req.body);
  successResponse(
    res,
    HttpStatus.CREATED,
    true,
    COMMON_MESSAGES.SUCCESS,
    experience
  );
};

export const addMessage = async (req: Request, res: Response) => {
  const message = await addMessageService(req.body);
  await sendMail({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });
  successResponse(
    res,
    HttpStatus.CREATED,
    true,
    COMMON_MESSAGES.SUCCESS,
    message
  );
};

export const getHome = async (req: Request, res: Response) => {
  const admin = await profile();
  successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.SUCCESS, admin);
};

export const getAboutUser = async (req: Request, res: Response) => {
  const about = await getAboutService();
  const skills = await getAllSkillsService();
  const experiences = await getAllExperiencesService();
  const data = { about, skills, experiences };
  successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.SUCCESS, data);
};

export const getProjectsUser = async (req: Request, res: Response) => {
  const projects = await getProjectsService();
  successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.SUCCESS, projects);
};

export const getInTouch = async (req: Request, res: Response) => {
  const data = await getGetInTouchService();
  successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.SUCCESS, data);
};
