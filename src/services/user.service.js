/* eslint-disable no-return-await */
const userDao = require('../dao/user.dao');

class userService {
  static async signUp(user) {
    console.info('signUp service called');
    const exists = await userDao.exists({ email: user.email });
    const error = { status: 409, error: 'email_in_use', message: 'Email in use' };
    if (exists) throw error;

    const newUser = await userDao.signUp(user);

    return newUser;
  }

  static async show(id) {
    console.info('show service called, id:', id);
    const exists = await userDao.exists({ _id: id });
    const error = { status: 404, error: 'no_such_user', message: 'No such user' };
    if (!exists) throw error;

    const user = await userDao.show(id);

    return user;
  }

  static async search(query) {
    console.info('search service called, query:', query);
    const users = await userDao.search(query);

    return users;
  }

  static async update(id, data) {
    console.info('update user service called:', id);

    const userExists = await userDao.exists({ _id: id });
    const userToUpdate = await userDao.show(id);
    const emailExists = await userDao.exists({ email: data.email });

    const emailError = { status: 409, error: 'invalid_email', message: 'Invalid email' };
    const userError = { status: 404, error: 'no_such_user', message: 'No such user' };

    if (!userExists) throw userError;
    if (emailExists && userToUpdate.email === data.email) return await userDao.update(id, data);
    if (emailExists) throw emailError;

    return await userDao.update(id, data);
  }

  static async delete(id) {
    console.info('delete service called: ', id);
    const exists = await userDao.exists({ _id: id });
    const error = { status: 404, error: 'no_such_user', message: 'No such user' };
    if (!exists) throw error;
    const user = await userDao.delete(id);

    return user;
  }
}

module.exports = userService;
