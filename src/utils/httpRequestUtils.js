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
        throw new Error(`Error: ${response.status} ${response.text()}`);
      }
      return await response.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  const makeRequest = async (url, method, data = null, headers = {}) => {
    try {
      const response = await apiRequest(url, method, data, headers);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: `${error.message}` };
    }
  };

export const getData = (url) => makeRequest(url, 'GET');
export const postData = (url, data) => makeRequest(url, 'POST', data);
export const putData = (url, data) => makeRequest(url, 'PUT', data);
export const deleteData = (url) => makeRequest(url, 'DELETE');

