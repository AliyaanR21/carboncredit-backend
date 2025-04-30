import { Trip } from '../../models';

import { HTTP_CODES } from '../../routes/utils/constants';

import GetAllTrips from './get-trips';

const AddNewTrip = async ({
  userId,
  date,
  mode,
  distance,
  credits,
  proof
}) => {
  if (!userId) {
    const err = new Error();
    err.statusCode = HTTP_CODES.BAD_REQUEST;
    err.errorMessage = 'User Required';
    throw err;
  }

  await Trip.create({
    userId,
    tripDate: date,
    tripMode: mode,
    tripDistance: distance,
    tripCredits: credits,
    tripProof: proof
  });

  const trips = await GetAllTrips({
    userId
  });

  return trips;
};

export default AddNewTrip;
