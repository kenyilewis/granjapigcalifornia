function validate(data, schema) {
  const { error } = schema.validate(data);
  console.info('Error in validate function:', error);

  return error;
}

const validateHandler = (schema, check) => (req, res, next) => {
  console.info('validateHandler called, check: ', check);
  const error = validate(req[check], schema);

  if (error) throw res.status(400).send({ message: `Required parameter is missing or wrong type. ${error?.details[0].message}`, status: 400 });
  next();
};

module.exports = validateHandler;
