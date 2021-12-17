const Location = require("../models/Location");

exports.location_get_all = async (req, res, next) => {
  Location.findAll()
    .then((location) => {
      console.log(location);
      res.status(200).json({ response: "success" });
    })
    .catch((err) => console.log(err));
};
