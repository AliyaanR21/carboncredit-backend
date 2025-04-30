import { HTTP_CODES } from './constants';

const CatchResponse = ({
  res,
  err
}) => {
  let statusCode = HTTP_CODES.INTERNAL_SERVER_ERROR;
  let errorMessage = 'Server Error';

  if (err.statusCode) {
    statusCode = err.statusCode;
  }

  if (err?.errorMessage) {
    errorMessage = err.errorMessage;
  }

  res.status(statusCode).json({
    success: false,
    errorMessage
  });
};


const SuccessResponse = ({
  res,
  message,
  ...rest
}) => {
  res.status(HTTP_CODES.SUCCESS).json({
    success: true,
    message,
    ...rest
  });
};

export {
  CatchResponse,
  SuccessResponse
};
