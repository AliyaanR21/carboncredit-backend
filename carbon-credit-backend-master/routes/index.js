import express from 'express';

import auth from './auth';
import trip from './trip';

import { API_ENDPOINTS } from './utils/constants';

const router = express.Router();

router.use(API_ENDPOINTS.AUTH.INDEX, auth);
router.use(API_ENDPOINTS.TRIPS.INDEX, trip);

export default router;
