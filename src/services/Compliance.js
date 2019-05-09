import BaseService from './BaseService';
import store from 'src/state/store';

/**
 * ComplianceService
 * @param {Object} self_certification - self certification responses
 * @return {Object} ComplianceService
 */
class ComplianceService extends BaseService {
  saveComplianceQuiz = (self_certification) => {
    const config = {
      url: `users/${store.getState().user.id}`,
      method: 'put',
      data: JSON.stringify({ self_certification })
    };

    return this.doRequest(config);
  }
}

export default ComplianceService;
