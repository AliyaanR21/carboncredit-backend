import { extend } from 'lodash';

import { HTTP_CODES } from '../../routes/utils/constants';

import { GetTrips } from '../../db-services/trip';

const GetAllTrips = async ({
  userId,
  isRecent
}) => {
  if (!userId) {
    const err = new Error();
    err.statusCode = HTTP_CODES.BAD_REQUEST;
    err.errorMessage = 'User Required';
    throw err;
  }

  let sortBy = {};
  let limit;
  if(isRecent){
    extend(sortBy, { createdAt: -1 })
    limit = 5
  }

  const trips = await GetTrips({
    filterParams: {
        userId
    },
    sortBy,
    limit
  })

  return trips;
};

export default GetAllTrips;
