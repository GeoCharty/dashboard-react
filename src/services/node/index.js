const API_URL = process.env.REACT_APP_DASHBOARD_API_URL;
const {
  abstractRequest
} = require("./../utils");

const CORE_ENTITY = "node";

const getByOrganizationId = async(params, abortSignal) => {
  const {
    organizationId
  } = params || {};
  const url = new URL(`/organization/${organizationId}/${CORE_ENTITY}/`, API_URL);

  const requestParams = {
    ...params,
    method: 'GET',
    url: url.toString(),
    defaultValue: []
  }

  return abstractRequest(requestParams, abortSignal);
} 
module.exports = {
  getByOrganizationId
}