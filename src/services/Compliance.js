import { API } from '../config/endpoints';

export const saveComplianceQuiz = async (self_certification) => (
  await fetch(`${API}/users/13`, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjg0LCJSb2xlIjoiIiwiZXhwIjoxNTU3MjQwNzcyLCJuYmYiOjE1NTcyMzcxNzN9.og6yAMQfpFOrk9OtP-we_xDL2_XwIHVm1jmq989_m_4',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ self_certification })
  })
  .then(({status}) => {
    return status;
  })
);

const Compliance = {
  saveComplianceQuiz
};

export default Compliance;
