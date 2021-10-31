exports.success = (req, res, message, status) => {
  const statusCode = status || 200;
  const statusMessage = message || '';

  res.status(status).send({
    error: false,
    statusCode,
    body: statusMessage,
  });
};

exports.error = (req, res, message, status, error) => {
  const statusCode = status || 500;
  const statusMessage = message || 'Internal Server Error';

  res.status(status).send({
    statusCode,
    body: statusMessage,
    error,
  });
};
