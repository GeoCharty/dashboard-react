const API_URL = process.env.REACT_APP_DASHBOARD_API_URL;
console.log("API_URL:", API_URL);
const {
  abstractRequest
} = require("../utils");

const CORE_ENTITY = "network";

const getByNodeId = async(params, abortSignal) => {
  const {
    nodeId
  } = params || {};
  const url = new URL(`node/${nodeId}/${CORE_ENTITY}/`, API_URL);

  const requestParams = {
    ...params,
    method: 'GET',
    url: url.toString(),
    defaultValue: []
  }

  return abstractRequest(requestParams, abortSignal);
} 
module.exports = {
  getByNodeId
}