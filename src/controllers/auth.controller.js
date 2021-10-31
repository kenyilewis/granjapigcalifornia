const authService = require('../services/auth.service');
const { codes } = require('../config').config;

class authController {
  static async login(req, res) {
    console.info('Login controlled called');
    const { email, password } = req.body;
    const { success, serverError } = codes;

    try {
      const result = await authService.login(email, password);

      return res.status(success).send(result);
    } catch (error) {
      console.error(`Error login with ${email}, Error: ${error}`);
      const { status } = error;
      const { message } = error;

      if (status === undefined) return res.status(serverError).send({ status: 500, message: 'Error when login user', error: message });

      return res.status(serverError).send({
        message: 'Error on signin',
        error,
      });
    }
  }

  static async verify(req, res) {
    const { token } = req.body;
    // To do ...
    return res.status(200).send('verify');
  }
}

module.exports = authController;
