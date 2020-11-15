import ErrorCodes from './../codes/ErrorCodes';
import StatusCodes from './../codes/StatusCodes';

export const getErrorCode = (name) => {
  if (ErrorCodes[name]) {
    return ErrorCodes[name];
  }
  return ErrorCodes['Default'];
};

export const getStatusCode = (name) => {
  if (StatusCodes[name]) {
    return StatusCodes[name];
  }
  return StatusCodes['Default'];
};
