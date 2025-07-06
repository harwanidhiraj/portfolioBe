import About from "../models/About";
import Admin from "../models/Admin";
import Experience from "../models/Experience";
import GetInTouch from "../models/GetInTouch";
import Message from "../models/Message";
import Profile from "../models/Profile";
import Project from "../models/Project";
import Skill from "../models/Skill";

export const findUserByEmail = async (email: string) => {
  return await Admin.findOne({ where: { email } });
};

export const getProfile = async () => {
  return await Profile.findOne();
};

export const updateProfileRepo = async (id: number, data: Partial<any>) => {
  await Profile.update(data, { where: { id } });
  return await Profile.findOne({ where: { id } });
};

export const getAboutRepo = async () => {
  return await About.findOne();
};

export const updateAboutRepo = async (
  id: number,
  data: { description: string }
) => {
  await About.update(data, { where: { id } });
  return await About.findOne({ where: { id } });
};

export const getAllSkillsRepo = async () => {
  return await Skill.findAll();
};

export const getSkillByIdRepo = async (id: number) => {
  return await Skill.findOne({ where: { id } });
};

export const updateSkillRepo = async (
  id: number,
  data: { name: string; iconName: string }
) => {
  await Skill.update(data, { where: { id } });
  return await Skill.findOne({ where: { id } });
};

export const deleteSkillRepo = async (id: number) => {
  return await Skill.destroy({ where: { id } });
};

export const getAllExperiencesRepo = async () => {
  return await Experience.findAll();
};

export const getExperienceByIdRepo = async (id: number) => {
  return await Experience.findOne({ where: { id } });
};

export const updateExperienceRepo = async (
  id: number,
  data: {
    title: string;
    companyName: string;
    duration: string;
    description: string;
  }
) => {
  await Experience.update(data, { where: { id } });
  return await Experience.findOne({ where: { id } });
};

export const deleteExperienceRepo = async (id: number) => {
  return await Experience.destroy({ where: { id } });
};

export const getMessagesRepo = async () => {
  return await Message.findAll({ order: [["createdAt", "DESC"]] });
};

export const getGetInTouchRepo = async () => {
  return await GetInTouch.findOne();
};

export const updateGetInTouchRepo = async (
  id: number,
  data: { email: string; phone: string; address: string }
) => {
  await GetInTouch.update(data, { where: { id } });
  return await GetInTouch.findOne({ where: { id } });
};

export const createProjectRepo = async (data: any) => {
  return await Project.create(data);
};

export const getProjectsRepo = async () => {
  return await Project.findAll({ order: [["createdAt", "DESC"]] });
};

export const getProjectByIdRepo = async (id: number) => {
  return await Project.findOne({ where: { id } });
};

export const updateProjectRepo = async (id: number, data: any) => {
  await Project.update(data, { where: { id } });
  return await Project.findOne({ where: { id } });
};

export const deleteProjectRepo = async (id: number) => {
  return await Project.destroy({ where: { id } });
};

export const addSkillRepo = async (data: {
  name: string;
  iconName: string;
}) => {
  return await Skill.create(data);
};

export const addExperienceRepo = async (data: {
  title: string;
  companyName: string;
  duration: string;
  description: string;
}) => {
  return await Experience.create(data);
};

export const addMessageRepo = async (data: {
  name: string;
  email: string;
  message: string;
}) => {
  return await Message.create(data);
};
