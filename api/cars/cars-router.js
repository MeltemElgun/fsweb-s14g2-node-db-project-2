// HOKUS POKUS
const router = require("express").Router();
const mw = require("./cars-middleware");
const carsModel = require("./cars-model");

router.get("/", async (req, res, next) => {
  try {
    let allCars = await carsModel.getAll();
    res.json(allCars);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", mw.checkCarId, (req, res, next) => {
  try {
    res.json(req.currentCar);
  } catch (error) {
    next(error);
  }
});
router.post(
  "/",
  mw.checkCarPayload,
  mw.checkVinNumberUnique,
  mw.checkVinNumberValid,
  async (req, res, next) => {
    try {
      let insertCar = await carsModel.create(req.body);
      res.json(insertCar);
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
