import BaseService from './BaseService';
import store from 'src/state/store';

/**
 * ComplianceService
 * @param {Object} self_certification - self certification responses
 * @return {Object} ComplianceService
 */
class ComplianceService extends BaseService {
  /**
   * saveComplianceQuiz
   * @param {object} quizResult - quiz result payload, contains:
   *    @param {string} tax_bracket - quiz answer
   *    @param {Array} large_enterprise - list of selected quiz answers
   *    @param {string} self_certification - quiz answer
   * @return {Promise} saveComplianceQuiz response
   */
  saveComplianceQuiz = (quizResult) => {
    const config = {
      url: `v2/users/${store.getState().user.id}`,
      method: 'put',
      data: JSON.stringify({ self_certification: quizResult })
    };

    return this.doRequest(config);
  }
}

export default ComplianceService;
