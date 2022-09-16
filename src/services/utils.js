
export const abstractRequest = async(params, abortSignal) => {
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
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      signal: abortSignal
    });
    response = await response.text();
  } catch (error) {
    console.log("abstractRequest Error: ", error);
    throw error;
  }
  try{ 
    response = JSON.parse(response);
  }catch{}

  return response || defaultValue;
}

