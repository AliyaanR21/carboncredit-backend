import express from 'express';

import { SignIn, SignUp } from '../controllers/auth';

import { LoginCheck } from '../middlewares/auth';
import SchemaValidator from '../middlewares/schema-validator';

import { API_ENDPOINTS, USER_STATUS } from './utils/constants';
import { CatchResponse, SuccessResponse } from './utils/helpers';

const validateRequest = SchemaValidator(true);


const router = express.Router();

router.post(
  API_ENDPOINTS.AUTH.SIGN_UP,
  validateRequest,
  async (req, res) => {
    try {
      const {
        body: {
          name,
          email,
          password,
          userRole
        }
      } = req;

      const message = await SignUp({
        name,
        email,
        password,
        userRole
      });

      SuccessResponse({
        res,
        message
      });
    } catch (err) {
      CatchResponse({
        res,
        err
      });
    }
  }
);

router.post(
  API_ENDPOINTS.AUTH.SIGN_IN,
  validateRequest,
  LoginCheck,
  async (req, res) => {
    try {
      const {
        user: {
          _id: userId,
          email,
          name = '',
          userRole,
          userStatus
        }
      } = req;

      const { token, message } = await SignIn({
        userId,
        email
      });

      // if (userStatus === USER_STATUS.PENDING) {
      //   return res.status(403).json({
      //     message: 'Your account is still under review. Please wait for admin approval.',
      //   });
      // }

      // if (userStatus === USER_STATUS.REJECTED) {
      //   return res.status(403).json({
      //     message: 'Your account has been rejected. Please contact support for more information.',
      //   });
      // }

      SuccessResponse({
        res,
        message,
        token,
        user: {
          userId,
          email,
          name,
          userRole,
          userStatus
        }
      });
    } catch (err) {
      CatchResponse({
        res,
        err
      });
    }
  }
);

export default router;
