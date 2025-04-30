const API_ENDPOINTS = {
  AUTH: {
    INDEX: '/auth',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up'
  },
  TRIPS: {
    INDEX: '/trip',
    ADD_TRIP: '/add-trip',
    GET_TRIPS: '/get-trips'
  }
};

const HTTP_CODES = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT_ERROR: 409,
  INTERNAL_SERVER_ERROR: 500
};

const OBJECT_REQUIRED_ERROR = {
  'object.missing': '{{#label}} cannot be missing',
  'object.base': '{{#label}} is not valid'
};

const STRING_REQUIRED_ERROR = {
  'string.empty': '{{#label}} cannot be an empty field',
  'string.required': '{{#label}} is a required field',
  'string.base': '{{#label}} is not valid'
};

const USER_STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  REJECTED : 'rejected'
}

const USER_ROLE = {
  EMPLOYEE: 'employee',
  EMPLOYER: 'employer',
  ADMIN : 'admin'
}

const TRANSPORT_MODE = {
  BIKE: 'bike',
  WALK: 'walk',
  BUS: 'bus',
  TRAIN: 'train',
  CARPOOL: 'carpool',
  CAR: 'car',
  BICYCLE: 'bicycle'
};


const LOG_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected'
};


export {
  API_ENDPOINTS,
  HTTP_CODES,
  TRANSPORT_MODE,
  LOG_STATUS,
  OBJECT_REQUIRED_ERROR,
  STRING_REQUIRED_ERROR,
  USER_STATUS,
  USER_ROLE
};
