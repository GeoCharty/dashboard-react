const API_URL = process.env.REACT_APP_POINTS_HANLDER_API_URL;
const {
  abstractRequest
} = require("./../utils");

const CORE_ENTITY = "point";

const getByDateRange = async(params, abortSignal) => {
  const {
    nodeId,
    attributeId,
    dateRange: {
      from,
      to
    },
    sort = "desc"
  } = params || {};

  const urlParams = new URLSearchParams({
    nodeId,
    attributeId,
    from,
    to,
    sort
  })

  const url = new URL(`/${CORE_ENTITY}/search?${urlParams.toString()}`, API_URL);
  
  const requestParams = {
    ...params,
    method: 'GET',
    url: url.toString(),
    defaultValue: []
  }

  return abstractRequest(requestParams, abortSignal);
} 


const getLastValues = async(params, abortSignal) => {
  const {
    nodeIds,
    attributeId
  } = params || {};

  const url = new URL(`/${CORE_ENTITY}/lastValues`, API_URL);
  
  const requestParams = {
    ...params,
    method: 'POST',
    payload: {
      nodeIds,
      attributeId
    },
    url: url.toString(),
    defaultValue: []
  }

  return abstractRequest(requestParams, abortSignal);
} 

module.exports = {
  getByDateRange,
  getLastValues
}