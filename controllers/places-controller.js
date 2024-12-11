const { v4: uuid } = require("uuid");

const HttpError = require("../models/http-eror");

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky in the world!",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "20 W 24th St, new York, NY 10001",
    creator: "u1",
  },
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id == placeId;
  });
  if (!place) {
    throw new HttpError("Could not find a place for the provided  id!", 404);
  }
  res.json({ place }); // { place } => { place: place }
};
// function getPlaceById() { ... }
// const getPlaceById = function() { ... }

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((p) => {
    return p.creator == userId;
  });
  if (!place) {
    return next(
      new HttpError("Could not find a place for the provided user id!", 404)
    );
  }

  return res.json({ place });
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;
  // const title = req.body.title;
  const createPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createPlace); //unshift(creaetePlace)
  res.status(201).json({ place: createPlace });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
