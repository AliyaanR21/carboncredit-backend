import express from 'express';

import AddNewTrip from '../controllers/trip/add-trip';
import GetAllTrips from '../controllers/trip/get-trips';

import SchemaValidator from '../middlewares/schema-validator';
import { API_ENDPOINTS } from './utils/constants';
import { CatchResponse, SuccessResponse } from './utils/helpers';
import { isEmployerOrAdmin } from '../middlewares';
import Trip from '../models/trip';

import { AuthenticateAuthToken } from '../middlewares/auth.js';

import { isEmployee } from '../middlewares/role-check';

const router = express.Router();
const validateRequest = SchemaValidator(true);

// ✅ EMPLOYEE - Submit trip
router.post(
  API_ENDPOINTS.TRIPS.ADD_TRIP,
  AuthenticateAuthToken,
  isEmployee,
  validateRequest,
  async (req, res) => {
    try {
      const {
        tripDate,
        tripMode,
        tripDistance,
        tripCredits,
        tripProof
      } = req.body;

      const trips = await AddNewTrip({
        userId: req.user._id,
        date: tripDate,
        mode: tripMode,
        distance: tripDistance,
        credits: tripCredits,
        proof: tripProof
      });

      SuccessResponse({ res, trips });
    } catch (err) {
      CatchResponse({ res, err });
    }
  }
);

// ✅ EMPLOYEE - Get own trips
router.get(
  '/my-trips',
  AuthenticateAuthToken,
  isEmployee,
  async (req, res) => {
    try {
      const trips = await Trip.find({ userId: req.user._id });
      SuccessResponse({ res, trips });
    } catch (err) {
      CatchResponse({ res, err });
    }
  }
);

// ✅ EMPLOYER/ADMIN - View all trips
router.get(
  '/admin/trips',
  AuthenticateAuthToken,
  isEmployerOrAdmin,
  async (req, res) => {
    try {
      const trips = await Trip.find().populate('userId', 'name email userRole');
      SuccessResponse({ res, trips });
    } catch (err) {
      CatchResponse({ res, err });
    }
  }
);

// ✅ EMPLOYER/ADMIN - Approve trip
router.post(
  '/admin/trip/:tripId/approve',
  AuthenticateAuthToken,
  isEmployerOrAdmin,
  async (req, res) => {
    try {
      const { tripId } = req.params;
      const trip = await Trip.findByIdAndUpdate(tripId, { tripStatus: 'verified' }, { new: true });
      if (!trip) return res.status(404).json({ message: 'Trip not found' });

      SuccessResponse({ res, message: 'Trip approved successfully', trip });
    } catch (err) {
      CatchResponse({ res, err });
    }
  }
);

// ✅ EMPLOYER/ADMIN - Reject trip
router.post(
  '/admin/trip/:tripId/reject',
  AuthenticateAuthToken,
  isEmployerOrAdmin,
  async (req, res) => {
    try {
      const { tripId } = req.params;
      const trip = await Trip.findByIdAndUpdate(tripId, { tripStatus: 'rejected' }, { new: true });
      if (!trip) return res.status(404).json({ message: 'Trip not found' });

      SuccessResponse({ res, message: 'Trip rejected successfully', trip });
    } catch (err) {
      CatchResponse({ res, err });
    }
  }
);

export default router;
