import BaseService from './BaseService';

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
  markdownToPDF = content => {
    const config = {
      url: 'md2pdf',
      method: 'post',
      data: {
        'markdown_text': content
      }
    };

    return this.doRequest(config);
  };
}

export default ModalService;  
