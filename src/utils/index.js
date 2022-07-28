
const getFeatureCollection = (data) => {
  return {
    "type": "FeatureCollection",
    "features": Array.isArray(data) ? data.map(d => {
      const {
        location,
        ...otherProps
      } = d;
      return {
        "type": "Feature",
        "properties": otherProps,
        "geometry": location
      }
    }) : []
  }
}
module.exports = {
  getFeatureCollection
}