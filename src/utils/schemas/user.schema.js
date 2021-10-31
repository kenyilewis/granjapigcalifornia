const Joi = require('joi');

const idValidation = Joi.string().pattern(new RegExp(/^[0-9a-fA-F]{24}$/));
const accessTokenValidation = [Joi.string(), Joi.number()];
const nameValidation = Joi.string().min(3).max(30);
const passwordValidation = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'));
const levelValidation = Joi.number().integer().min(1).max(50);
const emailValidation = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ['com', 'net'] },
});

const userSchema = Joi.object({
  name: nameValidation.required(),
  password: passwordValidation.required(),
  level: levelValidation.required(),
  email: emailValidation.required(),
});

const updateUserSchema = Joi.object({
  name: nameValidation,
  password: passwordValidation,
  level: levelValidation,
  email: emailValidation,
});

const idSchema = Joi.object({
  id: idValidation.required(),
});

const accessTokenSchema = Joi.object({
  accessToken: accessTokenValidation,
});

const loginSchema = Joi.object({
  password: passwordValidation.required(),
  email: emailValidation.required(),
});

module.exports = {
  userSchema,
  updateUserSchema,
  idSchema,
  accessTokenSchema,
  loginSchema,
};
