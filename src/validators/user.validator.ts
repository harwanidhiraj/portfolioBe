import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must be 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
});

export const updateProfileSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name must be a string.",
    "string.empty": "Name is required.",
  }),
  roles: Joi.string().required().messages({
    "string.base": "Roles must be a string.",
    "string.empty": "Roles are required.",
  }),
  description: Joi.string().required().messages({
    "string.base": "Description must be a string.",
    "string.empty": "Description is required.",
  }),
}).prefs({ convert: true });

export const updateAboutSchema = Joi.object({
  description: Joi.string().required().messages({
    "string.empty": "Description is required.",
  }),
});

export const updateSkillSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Skill name is required.",
  }),
  iconName: Joi.string().required().messages({
    "string.empty": "Icon name is required.",
  }),
});

export const updateExperienceSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required.",
  }),
  companyName: Joi.string().required().messages({
    "string.empty": "Company name is required.",
  }),
  duration: Joi.string().required().messages({
    "string.empty": "Duration is required.",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Description is required.",
  }),
});

export const updateGetInTouchSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Email must be valid.",
  }),
  phone: Joi.string().required().messages({
    "string.empty": "Phone is required.",
  }),
  address: Joi.string().required().messages({
    "string.empty": "Address is required.",
  }),
});

export const projectSchema = Joi.object({
  title: Joi.string()
    .required()
    .messages({ "string.empty": "Title is required." }),
  gitHubUrl: Joi.string()
    .uri()
    .optional()
    .messages({ "string.uri": "Invalid GitHub URL." }),
  liveUrl: Joi.string()
    .uri()
    .optional()
    .messages({ "string.uri": "Invalid live URL." }),
  tech: Joi.string()
    .required()
    .messages({ "string.empty": "Tech is required." }),
  description: Joi.string()
    .required()
    .messages({ "string.empty": "Description is required." }),
}).prefs({ convert: true });

export const skillSchema = Joi.object({
  name: Joi.string().required(),
  iconName: Joi.string().required(),
});

export const experienceSchema = Joi.object({
  title: Joi.string().required(),
  companyName: Joi.string().required(),
  duration: Joi.string().required(),
  description: Joi.string().required(),
});

export const messageSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  message: Joi.string().required(),
});
