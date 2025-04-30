import Joi from 'joi';

import {
  STRING_REQUIRED_ERROR,
  OBJECT_REQUIRED_ERROR
} from '../routes/utils/constants';

const validateName = Joi
  .string()
  .required()
  .messages(STRING_REQUIRED_ERROR)
  .label('Name');

const validateEmail = Joi
  .string()
  .required()
  .email()
  .messages(STRING_REQUIRED_ERROR)
  .label('Email');

const validatePassword = Joi
  .string()
  .required()
  .messages(STRING_REQUIRED_ERROR)
  .label('Password');

const validateUserRole = Joi
  .string()
  .required()
  .messages(STRING_REQUIRED_ERROR)
  .label('Role');

const signInSchema = Joi.object({
  email: validateEmail,
  password: validatePassword
})
  .required()
  .messages(OBJECT_REQUIRED_ERROR)
  .label('Sign In Body');

const signUpSchema = Joi.object({
    name: validateName,
    email: validateEmail,
    password: validatePassword,
    userRole: validateUserRole,
  })
    .required()
    .messages(OBJECT_REQUIRED_ERROR)
    .label('Sign Up Body');

export {
  signUpSchema,
  signInSchema
};
