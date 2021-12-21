function makeLocationDTO(locations) {
  const locationDTO = locations.map(
    ({ createdAt, updatedAt, ...keepAttrs }) => keepAttrs
  );

  return locationDTO;
}

module.exports = makeLocationDTO;
