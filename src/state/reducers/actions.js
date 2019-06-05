export const actionModel = [];

export const initialState = [
  {
    type: 'documents_ready',
    companyID: '1'
  },
  {
    type: 'prompt_shareholders',
    companyID: '1'
  },
  {
    type: 'directors_insurance',
    companyID: '2'
  }
];

export const actions = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
