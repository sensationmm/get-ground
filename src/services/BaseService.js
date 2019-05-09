import axios from 'axios';
import { API } from 'src/config/endpoints';
import store from 'src/state/store';

/**
 * BaseService
 * @return {Class} BaseService
 */
class BaseService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API
    });

    this.getConfig();
  }

  getConfig() {
    const auth = store.getState().auth;
    let token = null;

    if (auth.token) {
      token = `Bearer ${auth.token}`;
    } else {
      token = 'avb068cbk2os5ujhodmt';
    }

    this.doRequest = this.doRequest;
    this.config = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    };
  }

  /**
   * @param {object} config - request config overrides
   * @param {function|null} [callback] - function to execute on successful response
   * @return {Promise} call response
   */
  doRequest = async (config, callback = null) => {
    this.getConfig();

    const configData = {
      ...this.config,
      ...config
    };

    configData.headers = {
      ...this.config.headers,
      ...config.headers
    };

    return this.axiosInstance
      .request(configData)
      .then(response => {
        if(callback) {
          callback(response);
        }

        return response;
      })
      .catch(e => {
        return e.response;
      });
  }
}

export default BaseService;
