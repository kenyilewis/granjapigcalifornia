const User = require('../models/user.model');
require('../repositories/main.repository');

class userDao {
  static signUp(userData) {
    console.info('signUp dao called', userData);
    const user = User(userData)
      .save()
      .then((newUser) => newUser)
      .catch((error) => {
        const { message } = error;
        const validationError = { status: 500, message, error: error.name };
        if (message) throw validationError;
        throw error;
      });

    return user;
  }

  static async exists(query) {
    console.info('exists dao called', query);
    const result = await User.countDocuments(query).orFail();

    return result;
  }

  static async show(id) {
    console.info('show dao called');
    const result = await User.findById({ _id: id }).orFail();

    return result;
  }

  static async search(query) {
    console.info('search dao called');
    const result = await User.find(query).exec();

    return result;
  }

  static async update(id, data) {
    console.info('update dao called', id);
    const result = await User.updateOne({ _id: id }, data).exec();

    return result;
  }

  static async delete(id) {
    console.info('delete dao called');
    const result = await User.deleteOne({ _id: id }).exec();

    return result;
  }
}

module.exports = userDao;
