const CarModel = require('../models/car.model');

/**
 * carController.js
 *
 * @description :: Server-side logic for managing cars.
 */
module.exports = {
  /**
   * carController.list()
   */
  list: (req, res) => {
    CarModel.find((err, cars) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting car.',
          error: err,
        });
      }

      return res.json(cars);
    });
  },

  /**
   * carController.show()
   */
  show: (req, res) => {
    const { id } = req.params;

    CarModel.findOne({ _id: id }, (err, car) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting car.',
          error: err,
        });
      }

      if (!car) {
        return res.status(404).json({
          message: 'No such car',
        });
      }

      return res.json(car);
    });
  },

  /**
   * carController.create()
   */
  create: (req, res) => {
    const car = new CarModel({
      carDoor: req.body.carDoor,
      color: req.body.color,
    });

    // eslint-disable-next-line no-shadow
    car.save((err, car) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating car',
          error: err,
        });
      }

      return res.status(201).json(car);
    });
  },

  /**
   * carController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    CarModel.findOne({ _id: id }, function (err, car) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting car',
          error: err,
        });
      }

      if (!car) {
        return res.status(404).json({
          message: 'No such car',
        });
      }

      car.carDoor = req.body.carDoor ? req.body.carDoor : car.carDoor;
      car.color = req.body.color ? req.body.color : car.color;

      car.save(function (err, car) {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating car.',
            error: err,
          });
        }

        return res.json(car);
      });
    });
  },

  /**
   * carController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    CarModel.findByIdAndRemove(id, function (err, car) {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the car.',
          error: err,
        });
      }

      return res.status(204).json();
    });
  },
};
