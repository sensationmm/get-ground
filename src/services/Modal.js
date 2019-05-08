import { API } from 'src/config/endpoints';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjk1LCJSb2xlIjoiIiwiZXhwIjoxNTU3MzExNTA3LCJuYmYiOjE1NTczMDc5MDh9.9EZVSuincYajgCD6kS5onp9JIiezT453c14-l_RBD2M';

export const fetchModalContent = async () => (
  await fetch(`${API}/markdown_templates`, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(data => {
    return data;
  })
);

export const markdownToPDF = async content => (
  await fetch(`${API}/md2pdf`, {
    method: 'post',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ 'markdown_text': content }),
  })
  .then(response => response.blob())
  .then(data => {
    return data;
  })
);

const ModalServices = {
  fetchModalContent,
  markdownToPDF
};

export default ModalServices;
