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
        "geometry": location
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

const convertToLocalTimestamp = (millis) => {
  const date = new Date(millis);
  const offsetHours = new Date().getTimezoneOffset() / 60;
  date.setHours(date.getHours() - offsetHours);
  return date.valueOf();
}

const getColorByLastValue = (lastValue, queries) => {
  let value = true;
  lastValue = Number(lastValue.toFixed(2))
  for (const {query, result} of queries) {
    value = true
    for (const q in query) {
      if (q === "$eq" &&
        lastValue !== query[q]) {
          value = false
      }
      if (q === "$lt" &&
        lastValue >= query[q]) {
          value = false
      }
      if (q === "$gt" &&
        lastValue <= query[q]) {
          value = false
      }
      if (q === "$lte" &&
        lastValue > query[q]) {
          value = false
      }
      if (q === "$gte" &&
        lastValue < query[q]) {
          value = false
      }
    }
    if(value) return result.color || '#11b4da'
  }
  return '#11b4da';
}

module.exports = {
  getFeatureCollection,
  getTimestamps,
  convertToLocalTimestamp,
  getColorByLastValue
}