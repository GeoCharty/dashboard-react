const API_URL = process.env.REACT_APP_API_URL;
const {
  abstractRequest
} = require("./../utils");
const CORE_ENTITY = "attributeDiscretization";

const getByAttributeId = async(params, abortSignal) => {
  const {
    id: attributeId
  } = params;
  const url = new URL(`/attribute/${attributeId}/${CORE_ENTITY}/`, API_URL);
  const requestParams = {
    method: 'GET',
    url: url.toString(),
    defaultValue: []
  }
  return abstractRequest(requestParams, abortSignal);
} 
module.exports = {
  getByAttributeId
}