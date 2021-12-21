const Location = require("../models/Location");
const makeLocationDTO = require("../DTO/LocationDTO");

exports.location_get_all = async (req, res, next) => {
  Location.findAll({
    raw: true,
  })
    .then((locations) => {
      const locationDTO = makeLocationDTO(locations);
      res.status(200).json({ response: "success", locations: locationDTO });
    })
    .catch((err) => {
      next(err);
      console.log(err);
    });
};

exports.location_create = async (req, res, next) => {
  const { country, state, city } = req.body;
  console.log("storing info" + { country, state, city });

  // Create new location
  const location = await Location.create({ country, state, city });
  console.log(location);

  res.status(201).json({ created: location.dataValues });
};
