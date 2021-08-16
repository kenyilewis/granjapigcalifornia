const authService = require('../services/auth.service');
const { codes } = require('../config').config;

class authController {
  static async login(req, res) {
    console.info('Login controlled called');
    const { email, password } = req.body;
    const { badRequest, success, serverError } = codes;
    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      console.info('Login: Required parameter is missing or wrong type');

      return res.status(badRequest).send({
        status: 400,
        message: 'Required parameter is missing or wrong type',
      });
    }

    try {
      const result = await authService.login(email, password);

      return res.send(success).send(result);
    } catch (error) {
      console.error(`Error login with ${email}, Error: ${error}`);
      const { status } = error;
      if (status === undefined) return res.status(serverError).send({ status: 500, message: 'Error when login user', error });
      // return res.status(status).send(error);

      return res.send(serverError).send({
        error,
        message: 'Error when login user',
      });
    }
  }

  static async verify(req, res) {
    return res.send('verify');
  }
}

module.exports = authController;
