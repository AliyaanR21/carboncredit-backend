import { signInSchema, signUpSchema } from './auth';

import { API_ENDPOINTS } from '../routes/utils/constants';

const Schemas = {
  [API_ENDPOINTS.AUTH.SIGN_IN]: signInSchema,
  [API_ENDPOINTS.AUTH.SIGN_UP]: signUpSchema
};

export default Schemas;
