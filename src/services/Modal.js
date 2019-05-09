import BaseService from './BaseService';

/**
 * ModalService
 * 
 * @return {Object} ModalService
 */
class ModalService extends BaseService {
  fetchModalContent = () => {
    const config = {
      url: `markdown_templates`,
      method: 'get'
    };

    return this.doRequest(config);
  };
}

export default ModalService;  
