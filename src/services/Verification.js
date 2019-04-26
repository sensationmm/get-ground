import { API } from '../config/endpoints';

export const fetchVerification = async () => (
  await fetch(`${API}/users/verify_email`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer avb068cbk2os5ujhodmt',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({'email_verification_code': 'string'})
  })
  .then(({status}) => {
    return status;
  }).catch(err => err)
)
