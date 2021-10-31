const userService = require('../services/user.service');

class userController {
  static async signUp(req, res) {
    console.info('signUp contoller called, method: ', req.method);
    const {
      email,
      password,
      name,
      level,
    } = req.body;

    try {
      const response = await userService.signUp({
        email,
        password,
        name,
        level,
      });

      return res.status(201).send(response);
    } catch (error) {
      console.error('Error in signUp controller: ', error);
      const { status } = error;
      if (status === undefined) return res.status(500).send({ status: 500, message: 'Error when creating user', error });

      return res.status(status).send({ message: 'Error when creating user', error });
    }
  }

  static async get(req, res) {
    console.info('get users controller called, method: ', req.method);

    const { id } = req.params;

    try {
      let response;
      if (id) {
        response = await userService.show(id);
      } else {
        response = await userService.search(req.query);
      }

      return res.status(200).send(response);
    } catch (error) {
      console.error('Error in get controller: ', error);
      const { status } = error;
      const { message } = error;

      if (status === undefined) return res.status(500).send({ status: 500, message: 'Error when get user(s)', error: message });

      return res.status(status).send({ message: 'Error when get user(s)', error });
    }
  }

  static async update(req, res) {
    console.info('Update user controller called, method: ', req.method);

    const { id } = req.params;
    const { email, name, level } = req.body;

    try {
      const user = await userService.update(id, { email, name, level });

      return res.status(200).send({ message: `${user.nModified} user modified` });
    } catch (error) {
      console.error('Error in update controller, id: %s Error: %s', id, error);
      const { status } = error;
      const { message } = error;

      if (status === undefined) return res.status(500).send({ status: 500, message: 'Error when update user', error: message });
      return res.status(status).send({ message: 'Error when update user', error });
    }
  }

  static async delete(req, res) {
    console.info('delete controller called: ', req.method);
    const { id } = req.params;

    try {
      await userService.delete(id);

      return res.status(200).send({ message: 'User deleted' });
    } catch (error) {
      console.error('Error in delete controller', error);
      const { status } = error;
      const { message } = error;

      if (status === undefined) return res.status(500).send({ status: 500, message: 'Error when update user', error: message });

      return res.status(status).send({ message: 'Error when update user', error });
    }
  }
}

module.exports = userController;
