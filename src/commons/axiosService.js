import axios from 'axios';

class AxiosService {
  constructor() {
    const instance = axios.create();
    instance.interceptors.response.use(this.handleSuccess, this.handleFailed);
    this.globInstance = instance;
  }

  // eslint-disable-next-line class-methods-use-this
  handleSuccess(response) {
    return response;
  }

  // eslint-disable-next-line class-methods-use-this
  handleFailed(error) {
    return Promise.reject(error);
  }

  get(url) {
    return this.globInstance.get(url);
  }

  post(url, body) {
    return this.globInstance.post(url, body);
  }

  put(url, body) {
    return this.globInstance.put(url, body);
  }

  delete(url) {
    return this.globInstance.delete(url);
  }
}

export default AxiosService;
