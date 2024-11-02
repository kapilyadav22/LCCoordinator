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
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  };
  
  export const getData = async (url) => {
    try {
      return await apiRequest(url, 'GET');
    } catch (error) {
      console.error(`Failed to GET data from ${url}:`, error);
      return null; 
    }
  };
  
  export const postData = async (url, data) => {
    try {
      return await apiRequest(url, 'POST', data);
    } catch (error) {
      console.error(`Failed to POST data to ${url}:`, error);
      return null;
    }
  };
  
  export const putData = async (url, data) => {
    try {
      return await apiRequest(url, 'PUT', data);
    } catch (error) {
      console.error(`Failed to PUT data to ${url}:`, error);
      return null;
    }
  };
  
  export const deleteData = async (url) => {
    try {
      return await apiRequest(url, 'DELETE');
    } catch (error) {
      console.error(`Failed to DELETE data from ${url}:`, error);
      return null;
    }
  };
