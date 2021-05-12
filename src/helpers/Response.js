let writeResponse = (res, success, status, message, data) => {
  let response = {
    success,
    message,
    data,
  };
  res.status(status).json(response);
};

let writeError = (res, status, message) => {
  let success = false;
  let error = {
    success,
    status,
    message,
  };
  res.status(status).json(error);
};

module.exports = {
  writeResponse,
  writeError,
};
