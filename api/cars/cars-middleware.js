const carsModel = require("./cars-model");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  // HOKUS POKUS
  try {
    let { id } = req.params;
    const isExistCar = await carsModel.getById(id);
    if (!isExistCar) {
      res
        .status(404)
        .json({ message: `${id} kimliğine sahip araba bulunamadı` });
    } else {
      req.currentCar = isExistCar;
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkCarPayload = (req, res, next) => {
  // HOKUS POKUS
  try {
    let fields = ["vin", "make", "model", "mileage"];
    let missedFields = [];
    for (let i = 0; i < fields.length; i++) {
      if (req.body[fields[i]] === undefined) {
        missedFields.push(fields[i]);
      }
    }

    if (missedFields.length > 0) {
      res
        .status(400)
        .json({ message: `${missedFields.toString()} is missing.` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkVinNumberValid = (req, res, next) => {
  // HOKUS POKUS
  try {
    const isValidVin = vinValidator.validate(req.body.vin);
    if (!isValidVin) {
      res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  // HOKUS POKUS
  try {
    const isExistVinNumber = await carsModel.getByVinNumber(req.body.vin);
    if (isExistVinNumber) {
      res.status(400).json({ message: `vin ${req.body.vin} already exists` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
};
