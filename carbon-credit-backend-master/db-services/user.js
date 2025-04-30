import { User } from '../models';

import { HTTP_CODES, USER_STATUS } from '../routes/utils/constants';

const AddUser = async ({
  filterParams = {},
  selectParams = {}
}) => {
  const {
    name,
    email,
    password,
    userRole,
  } = filterParams;

  const exitingUser = await User
    .findOne({ email })
    .select(selectParams);

  if (!exitingUser) {
    const newUser = new User({
      name,
      email,
      password,
      userRole,
    });

    await newUser.save();

    return ({ message: 'New User Added Successfully' });
  }

  const err = new Error();
  err.statusCode = HTTP_CODES.CONFLICT_ERROR;
  err.errorMessage = 'Email Is Already Exists';

  throw err;
};

const GetUser = async ({
  filterParams = {},
  selectParams = {}
}) => {
  const user = await User
    .findOne(filterParams)
    .select(selectParams);
  return user;
};

export {
  AddUser,
  GetUser
};
