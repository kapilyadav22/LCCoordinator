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
      console.log(response)
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
      const response = await apiRequest(url, 'GET');
      return { success: true, data: response };
    } catch (error) {
      console.error(`Failed to GET data to ${url}:`, error);
      return { success: false, error: `Unable to get data: ${error.message}` };
    }
  };
  
  export const postData = async (url, data) => {
    try {
      const response = await apiRequest(url, 'POST', data);
      return { success: true, data: response };
    } catch (error) {
      console.error(`Failed to POST data to ${url}:`, error);
      return { success: false, error: `Unable to post data: ${error.message}` };
    }
  };
  
  
  export const putData = async (url, data) => {
    try {
      const response = await apiRequest(url, 'PUT', data);
      return { success: true, data: response };
    } catch (error) {
      console.error(`Failed to PUT data to ${url}:`, error);
      return { success: false, error: `Unable to PUT data: ${error.message}` };
    }
  };

  export const deleteData = async (url, data) => {
    try {
      const response = await apiRequest(url, 'DELETE');
      return { success: true, data: response };
    } catch (error) {
      console.error(`Failed to DELETE data to ${url}:`, error);
      return { success: false, error: `Unable to DELETE data: ${error.message}` };
    }
  };

