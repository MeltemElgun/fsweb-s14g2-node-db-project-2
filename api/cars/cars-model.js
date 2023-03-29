const db = require("../../data/db-config");

const getAll = () => {
  // HOKUS POKUS
  return db("cars");
};

const getById = (id) => {
  // HOKUS POKUS
  return db("cars").where({ id }).first();
};

const getByVinNumber = (vin) => {
  return db("cars").where({ vin }).first();
};
const create = async (cars) => {
  // HOKUS POKUS
  let [id] = await db("cars").insert(cars);
  return getById(id);
};

module.exports = {
  getAll,
  getById,
  getByVinNumber,
  create,
};
