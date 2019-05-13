import BaseService from './BaseService';

/**
 * ModalService
 * 
 * @param {string} title - markdown to return
 * @return {Object} ModalService
 */
class ModalService extends BaseService {
  fetchModalContent = (title) => {
    const config = {
      url: `markdown_templates/title/${title}`,
      method: 'get'
    };

    return this.doRequest(config);
  };
}

export default ModalService;  
