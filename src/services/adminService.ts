import { ErrorType } from "../constants/messages";
import { uploadToCloudinary } from "../controller/fileController";
import { throwError } from "../middlewares/errorMiddleware";
import {
  addExperienceRepo,
  addMessageRepo,
  addSkillRepo,
  createProjectRepo,
  deleteExperienceRepo,
  deleteProjectRepo,
  deleteSkillRepo,
  findUserByEmail,
  getAboutRepo,
  getAllExperiencesRepo,
  getAllSkillsRepo,
  getExperienceByIdRepo,
  getGetInTouchRepo,
  getMessagesRepo,
  getProfile,
  getProjectByIdRepo,
  getProjectsRepo,
  getSkillByIdRepo,
  updateAboutRepo,
  updateExperienceRepo,
  updateGetInTouchRepo,
  updateProfileRepo,
  updateProjectRepo,
  updateSkillRepo,
} from "../repositories/adminRepositories";
import { comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import { Request, Response } from "express";

interface PlainUserType {
  id: number;
  email: string;
  password?: string;
}

export const login = async (req: Request, res: Response) => {
  const existingUser = await findUserByEmail(req.body.email);
  if (!existingUser) {
    throwError(ErrorType.EMAIL_NOT_FOUND);
  }

  const plainUser = existingUser?.get({ plain: true }) as PlainUserType;
  const checkPassword = await comparePassword(
    req.body.password,
    plainUser?.password ?? ""
  );

  if (!checkPassword) {
    throwError(ErrorType.INCORRECT_PASSWORD);
  }

  const token = generateToken({ userId: plainUser?.id });

  if (plainUser) {
    delete plainUser.password;
  }

  return { plainUser, token };
};

export const profile = async () => {
  const profile = await getProfile();
  return profile;
};

export const updateProfileService = async ({
  name,
  roles,
  description,
  resumeFile,
  imageFile,
}: {
  name?: string;
  roles?: string;
  description?: string;
  resumeFile?: Express.Multer.File;
  imageFile?: Express.Multer.File;
}) => {
  const existingProfile = await getProfile();
  if (!existingProfile) throw new Error("Profile not found");

  let resumeUrl = existingProfile.resumeUrl;
  let imageUrl = existingProfile.imageUrl;

  if (resumeFile) {
    const resumeUpload = await uploadToCloudinary(resumeFile.path, "resume");
    resumeUrl = resumeUpload.secure_url;
  }

  if (imageFile) {
    const imageUpload = await uploadToCloudinary(imageFile.path, "image");
    imageUrl = imageUpload.secure_url;
  }

  const updated = await updateProfileRepo(existingProfile.id, {
    name,
    roles,
    description,
    resumeUrl,
    imageUrl,
  });

  return updated;
};

export const getAboutService = async () => {
  return await getAboutRepo();
};

export const updateAboutService = async ({
  description,
}: {
  description: string;
}) => {
  const existing = await getAboutRepo();
  if (!existing) throw new Error("About section not found");

  return await updateAboutRepo(existing.id, { description });
};

export const getAllSkillsService = async () => {
  return await getAllSkillsRepo();
};

export const getSkillByIdService = async (id: number) => {
  const skill = await getSkillByIdRepo(id);
  if (!skill) throw new Error("Skill not found");
  return skill;
};

export const updateSkillService = async (
  id: number,
  data: { name: string; iconName: string }
) => {
  const skill = await getSkillByIdRepo(id);
  if (!skill) throw new Error("Skill not found");
  return await updateSkillRepo(id, data);
};

export const deleteSkillService = async (id: number) => {
  const skill = await getSkillByIdRepo(id);
  if (!skill) throw new Error("Skill not found");
  await deleteSkillRepo(id);
};

export const getAllExperiencesService = async () => {
  return await getAllExperiencesRepo();
};

export const getExperienceByIdService = async (id: number) => {
  const experience = await getExperienceByIdRepo(id);
  if (!experience) throw new Error("Experience not found");
  return experience;
};

export const updateExperienceService = async (
  id: number,
  data: {
    title: string;
    companyName: string;
    duration: string;
    description: string;
  }
) => {
  const existing = await getExperienceByIdRepo(id);
  if (!existing) throw new Error("Experience not found");

  return await updateExperienceRepo(id, data);
};

export const deleteExperienceService = async (id: number) => {
  const existing = await getExperienceByIdRepo(id);
  if (!existing) throw new Error("Experience not found");
  return await deleteExperienceRepo(id);
};

export const getMessagesService = async () => {
  return await getMessagesRepo();
};

export const getGetInTouchService = async () => {
  return await getGetInTouchRepo();
};

export const updateGetInTouchService = async ({
  email,
  phone,
  address,
}: {
  email: string;
  phone: string;
  address: string;
}) => {
  const existing = await getGetInTouchRepo();
  if (!existing) throw new Error("Get in touch record not found");

  return await updateGetInTouchRepo(existing.id, { email, phone, address });
};

export const createProjectService = async (data: any) => {
  return await createProjectRepo(data);
};

export const getProjectsService = async () => {
  return await getProjectsRepo();
};

export const getProjectByIdService = async (id: number) => {
  const project = await getProjectByIdRepo(id);
  if (!project) throw new Error("Project not found");
  return project;
};

export const updateProjectService = async (id: number, data: any) => {
  const existing = await getProjectByIdRepo(id);
  if (!existing) throw new Error("Project not found");
  return await updateProjectRepo(id, data);
};

export const deleteProjectService = async (id: number) => {
  const project = await getProjectByIdRepo(id);
  if (!project) throw new Error("Project not found");
  return await deleteProjectRepo(id);
};

export const addSkillService = async (data: {
  name: string;
  iconName: string;
}) => {
  return await addSkillRepo(data);
};

export const addExperienceService = async (data: {
  title: string;
  companyName: string;
  duration: string;
  description: string;
}) => {
  return await addExperienceRepo(data);
};

export const addMessageService = async (data: {
  name: string;
  email: string;
  message: string;
}) => {
  return await addMessageRepo(data);
};
