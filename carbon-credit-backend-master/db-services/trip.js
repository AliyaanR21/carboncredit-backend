import { Trip } from '../models';

const DeleteTrip = async ({
  filterParams = {}
}) => {
  await Trip.deleteOne(filterParams);
};

const GetTrip = async ({
  filterParams = {}
}) => {
  const reportEntry = await Trip.findOne(filterParams);

  return reportEntry;
};

const GetTrips = async ({
    filterParams = {},
    sortBy = {},
    limit
  }) => {
    const reportEntry = await Trip
      .find(filterParams)
      .sort(sortBy)
      .limit(Number(limit));
  
    return reportEntry;
  };

const UpdateTrip = async ({
  filterParams = {},
  updateParams = {}
}) => {
  await Trip.updateOne({
    ...filterParams
  }, {
    $set: {
      ...updateParams
    }
  }, {
    upsert: true
  });
};

export {
    DeleteTrip,
    GetTrip,
    GetTrips,
    UpdateTrip
};

