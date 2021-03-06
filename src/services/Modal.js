import BaseService from './BaseService';
// import { API } from 'src/config/endpoints';

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
    * @param {string} title - passing title into markdown
    * @return {Promise} markdownToPDF response
    */

    //TODO: change to be V2
   markdownToPDF = async (content, title) => (
    await fetch(`https://staging-backend-236514.appspot.com/api/v2/md2pdf`, {
      method: 'post',
      headers: {
        'Authorization': 'avb068cbk2os5ujhodmt'
      },
      body: JSON.stringify({ 'markdown_text': title ? `# <center>[ ${title} ]</center><br>` + content : content }),
    })
    .then(response => response.status === 400 ? response : response.blob())
    .then(data => {
      return data;
    })
  );
}

export default ModalService;
