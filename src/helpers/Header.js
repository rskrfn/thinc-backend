let writeResponse = (res, success, status, message, data) => {
  let response = {
    success,
    message,
    data,
  };
  res.status(status).json(response);
};

const writeError = (res, error) => {
  res.status(500).json(new Error(error));
};

module.exports = {
  writeResponse,
  writeError,
};
