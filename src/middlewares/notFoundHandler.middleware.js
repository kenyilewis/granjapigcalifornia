const Boom = require('@hapi/boom');

module.exports = function notFoundHandler(req, res) {
  const {
    output: { statusCode, payload },
  } = Boom.notFound();

  res.status(statusCode).send(payload);
};
