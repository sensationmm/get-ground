import BaseService from './BaseService';

import { API } from 'src/config/endpoints';
import store from 'src/state/store';

/**
 * ModalService
 * @return {Object} ModalService
 */
class ModalService extends BaseService {
  /**
    * @param {string} title - markdown to return
    * @return {Promise} fetchModalContent response
    */
  fetchModalContent = (title) => {
    const config = {
      url: `markdown_templates/title/${title}`,
      method: 'get'
    };

    return this.doRequest(config);
  };

  /**
    * @param {string} content - markdown to transform into PDF
    * @return {Promise} markdownToPDF response
    */
  markdownToPDF = async content => (
    await fetch(`${API}/md2pdf`, {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${store.getState().auth.token}`
      },
      body: JSON.stringify({ 'markdown_text': content }),
    })
    .then(response => response.status === 400 ? response : response.blob())
    .then(data => {
      return data;
    })
  );
}

export default ModalService;  
