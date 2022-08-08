const moment = require("moment");

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
        "geometry": {
          ...location,
          coordinates: location.coordinates.reverse()
        }
      }
    }) : []
  }
}
const getTimestamps = (dateRange) => {
  const {
    id: dateRangeId
  } = dateRange;

  switch (dateRangeId) {
    case 0:
      return {
        from: moment().startOf('hour').valueOf(),
        to: moment().endOf("hour").valueOf()
      }
    case 1:
      return {
        from: moment().startOf('day').valueOf(),
        to: moment().endOf("day").valueOf()
      }
    case 2:
      return {
        from: moment().startOf('week').valueOf(),
        to: moment().endOf("week").valueOf()
      }
    case 3:
      return {
        from: moment().startOf('year').valueOf(),
        to: moment().endOf("year").valueOf()
      }
    default:
      throw new Error("NO DATE RANGE ALLOWED")
  }
}

module.exports = {
  getFeatureCollection,
  getTimestamps
}