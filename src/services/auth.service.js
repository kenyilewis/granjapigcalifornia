const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userDao = require('../dao/user.dao');
const { privateKey } = require('../config').tokenConfig;

class authService {
  static async login(email, password) {
    console.info('login service called');
    // To do encriptar el password y comparar los hash

    const userData = await userDao.search({ email });
    const verify = await bcrypt.compare(password, userData.password);
    const errorVerify = { status: 401, error: 'Error login', message: 'Internal Login Error' };
    console.info('v-verify', verify);

    if (!verify) throw errorVerify;
    console.info('userData', userData);
    // To do
    // const token = await this.createToken(userData._id, userData.email, userData.level);

    return userData;
  }

  static async createToken(id, email, level) {
    console.info('creating token');

    const tokenData = { id, email, level };
    const generateToken = await jwt.sign(tokenData, privateKey, { expiresIn: 60 * 60 });

    return { token: generateToken };
  }

  static async verify(token) {
    console.info('verifying token');
    let valid = false;

    jwt.verify(token, privateKey, (err) => {
      if (err) {
        valid = false;
      } else {
        valid = true;
      }
    });

    return valid;
  }
}

module.exports = authService;
