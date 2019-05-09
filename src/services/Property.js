import { API } from 'src/config/endpoints';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjk1LCJSb2xlIjoiIiwiZXhwIjoxNTU3Mzk3OTM5LCJuYmYiOjE1NTczOTQzNDB9.RSyteMgMBIpJ66QhaJNu4DVf71jHZG_igyVXQ1uhq5A';

export const SavePropertyAddress = async data => (
  await fetch(`${API}/companies`, {
    method: 'post',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      'property_country': data.country,
      'property_street': data.street,
      'property_city': data.city,
      'unit_number': data.unitNumber,
      'property_postcode': data.postcode
    }),
  })
  .then(response => response.json())
  .then(data => {
    return data;
  })
);

const PropertyServices = {
  SavePropertyAddress,
};

export default PropertyServices;
