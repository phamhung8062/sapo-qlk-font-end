/* eslint-disable class-methods-use-this */
import axios from 'axios';
class AxiosService {
  // constructor() {
  //   const instance = axios.create();
  //   instance.interceptors.response.use(this.handlerSuccess, this.handlerError);
  //   this.instance = instance;
  // }
  constructor() {
    const instance = axios.create({
      headers: {},
    });
    instance.interceptors.response.use(this.handleSuccess, this.handleError);
    this.instance = instance;
  }

  handlerSuccess(response) {
    return response;
  }

  handlerError(error) {
    return Promise.reject(error);
  }

  get(url) {
    return this.instance.get(url);
  }

  getall(url, data) {
    return this.instance.patch(url, data);
  }

  post(url, body) {
    return this.instance.post(url, body);
  }

  // postLogin(endpoint, payload) {
  //   return this.service.request({
  //     method: 'POST',
  //     url: endpoint,
  //     responseType: 'json',
  //     data: payload,
  //   });
  // }

  put(url, body) {
    return this.instance.put(url, body);
  }

  delete(url) {
    return this.instance.delete(url);
  }

  setHeader(name, value) {
    this.instance.defaults.headers.common[name] = value;
  }

  removeHeader(name) {
    delete this.instance.defaults.headers.common[name];
  }
}
export default new AxiosService();
