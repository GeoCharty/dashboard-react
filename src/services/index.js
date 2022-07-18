

const API_URL = process.env.REACT_APP_API_URL;
const pathNames = {}
const {
  ALL_POINTS = "point",
  ALL_ATTRIBUTES = "attribute/raw",
  DISCRETIZATION_BY_ATTRIBUTE_ID = "discretization/attribute"
} = pathNames;

export async function abstractRequest(params, abortSignal) {
  console.log(`abstractRequest Params: ${params}`);
  if (!params) throw new Error('EMPTY PARAMS NOT ALLOWED');

  const {
    url,
    payload,
    method,
    defaultValue
  } = params;

  let response;
  try {
    response = await fetch(url, {
      method,
      body: payload,
      signal: abortSignal
    });
    response = await response.text();
  } catch (error) {
    console.log("abstractRequest Error: ", error);
    throw error;
  }
  try{ 
    response = JSON.parse(response); 
    response = response.payload;
  }catch{}

  return response || defaultValue;
}

export async function getRawAttribute(params, abortSignal) {

  const requestParams = {
    ...params,
    method: 'GET',
    url: new URL(ALL_ATTRIBUTES, API_URL).toString(),
    defaultValue: []
  }
  console.log(`getRawAttribute requestParams: ${JSON.stringify(requestParams, null, 2)}`)

  return abstractRequest(requestParams, abortSignal);
} 

export async function getDiscretization(params, abortSignal) {
  const {
    attributeId = "9123123812983"
  } = params;
  const pathName = `${DISCRETIZATION_BY_ATTRIBUTE_ID}/${attributeId}`

  const requestParams = {
    ...params,
    method: 'GET',
    url: new URL(pathName, API_URL).toString(),
    defaultValue: {}
  }
  console.log(`getDiscretization requestParams: ${JSON.stringify(requestParams, null, 2)}`)

  return abstractRequest(requestParams, abortSignal);
} 


export async function getPoints(params, abortSignal) {
  const {
    dashboardId = "0121312312",
    networkId = "123120312"
  } = params;
  const pathName = `dashboard/${dashboardId}/network/${networkId}/${ALL_POINTS}`;

  const requestParams = {
    ...params,
    method: 'GET',
    url: new URL(pathName, API_URL).toString(),
    defaultValue: []
  }
  console.log(`getPoints requestParams: ${JSON.stringify(requestParams, null, 2)}`);

  return abstractRequest(requestParams, abortSignal);
}