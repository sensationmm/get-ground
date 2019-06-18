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
      unauthed: true,
      url: `markdown_templates/title/${title}`,
      method: 'get'
    };

    return this.doRequest(config);
  };

  /**
    * @param {string} content - markdown to transform into PDF
    * @return {Promise} markdownToPDF response
    */
  markdownToPDF = async content => {

    const config = {
      unauthed: true,
      url: `md2pdf`,
      method: 'post',
      data: JSON.stringify({ 'markdown_text': content })
    };

    return this.doRequest(config);
  };
}

export default ModalService;  
