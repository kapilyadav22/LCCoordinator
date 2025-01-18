const apiRequest = async (url, method, data = null, headers = {}) => {
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };
  
    if (data) {
      config.body = JSON.stringify(data);
    }
  
    try {
      const response = await fetch(url, config);
      const jsonresponse = await response.json();
      if (!response.ok) {
        throw new Error(`${jsonresponse.message}`);
      }
      return jsonresponse;
    } catch (error) {
      throw error;
    }
  };
  
  const makeRequest = async (url, method, data = null, headers = {}) => {
    try {
      const response = await apiRequest(url, method, data, headers);
      return response;
    } catch (error) {
      return error.message;
    }
  };

export const getData = (url) => makeRequest(url, 'GET');
export const postData = (url, data) => makeRequest(url, 'POST', data);
export const putData = (url, data) => makeRequest(url, 'PUT', data);
export const deleteData = (url) => makeRequest(url, 'DELETE');

