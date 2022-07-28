const API_URL = process.env.REACT_APP_API_URL;
const {
  abstractRequest
} = require("./../utils");

const CORE_ENTITY = "node";
const staticOrganizationId = "47119723";

const getByOrganizationId = async(params, abortSignal) => {
  const url = new URL(`/organization/${staticOrganizationId}/${CORE_ENTITY}/`, API_URL);

  const requestParams = {
    ...params,
    method: 'GET',
    url: url.toString(),
    defaultValue: []
  }
  console.log(`[${CORE_ENTITY}] getByOrganizationId requestParams: ${JSON.stringify(requestParams, null, 2)}`)

  return abstractRequest(requestParams, abortSignal);
} 
module.exports = {
  getByOrganizationId
}