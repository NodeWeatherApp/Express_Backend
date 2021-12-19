const Location = require("../models/Location");

exports.location_get_all = async (req, res, next) => {
  Location.findAll()
    .then((locations) => {
      console.log(locations);
      res.status(200).json({ response: "success", locations: locations });
    })
    .catch((err) => console.log(err));
};

exports.location_create = async (req, res, next) => {
  const { country, state, city } = req.body;
  console.log("storing info" + { country, state, city });

  // Create new location
  const location = await Location.create({ country, state, city });
  console.log(location);

  res.status(201).json({ created: location.dataValues });
};

exports.location_delete = async (req, res, next) => {
  Location.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => res.send("success"));
};

exports.location_update = async (req, res, next) => {
  const { country, city, state, id } = req.body;
  Location.update(
    {
      country,
      city,
      state,
    }, 
    {
      where: {
        id: id,
      },
    }
  ).then(() => res.send("successfully updated"));
};
