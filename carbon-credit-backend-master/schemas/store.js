import Joi from 'joi';

import {
  OBJECT_REQUIRED_ERROR
} from '../routes/utils/constants';

const getStoresSchema = Joi.object({})
  .required()
  .messages(OBJECT_REQUIRED_ERROR)
  .label('getStoresSchema')
  .options({ allowUnknown: true });

export {
  getStoresSchema
};
