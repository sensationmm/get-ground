export const companyModel = {
  name: '',
  address: { premise: '', street: '', posttown: '', postcode: '' },
  shareholders: [],
  directors: [],
  documents: [],
  bank_account: {
    name: '',
    sort_code: '',
    account_number: '',
    address: { branch: '', street: '', town: '', postcode: '' },
    iban: '',
    balance: '',
    transactions: []
  }
};

export const initialState = [
  {
    id: '1',
    name: 'Dunmow Ltd',
    address: {
      premise: '93  Dunmow Road',
      street: 'Lanstephan',
      posttown: 'Launceston',
      postcode: 'PL15 8JN'
    },
    shareholders: [
      'Shona Longley',
      'Patrick Richards'
    ],
    directors: [
      'Grace Hecker'
    ],
    documents: [
      { name: 'Shareholders agreement', file: 'http://www.google.com' },
      { name: 'Company Articles of Association', file: 'http://www.google.com' },
      { name: 'Directors Loan Agreement', file: 'http://www.google.com' }
    ],
    bank_account: {
      name: 'Daniel Hecker',
      sort_code: '10-75-99',
      account_number: '9837 4831',
      address: {
        branch: 'Barclays Bank PLC',
        street: '1 Churchill Place',
        town: 'London',
        postcode: 'E14 5HP'
      },
      iban: 'DE27100777-770209299700',
      balance: '£483,293.62',
      transactions: [
        {
          date: '2019-04-30',
          name: 'Smith Plumbers Ltd',
          sum: '-£200',
          balance: '£483,293.62'
        },
        {
          date: '2019-04-30',
          name: 'J Jones Rent',
          sum: '+£1,200',
          balance: '£483,293.62'
        },
        {
          date: '2019-04-30',
          name: 'J Jones Rent',
          sum: '+£1,200',
          balance: '£483,293.62'
        },
        {
          date: '2019-04-13',
          name: 'Smith Plumbers Ltd',
          sum: '-£200',
          balance: '£483,293.62'
        },
        {
          date: '2019-04-13',
          name: 'J Jones Rent',
          sum: '+£1,200',
          balance: '£483,293.62'
        }
      ]
    }
  },
  {
    id: '2',
    name: 'Clasper Ltd',
    address: {
      premise: '73  Clasper Way',
      street: 'Lanstephan',
      posttown: 'Launceston',
      postcode: 'TA18 6LW'
    },
    shareholders: [
      'Shona Longley',
      'Patrick Richards'
    ],
    directors: [
      'Grace Hecker'
    ],
    documents: [
      { name: 'Shareholders agreement', file: 'http://www.google.com' },
      { name: 'Company Articles of Association', file: 'http://www.google.com' },
      { name: 'Directors Loan Agreement', file: 'http://www.google.com' }
    ],
    bank_account: {
      name: 'Daniel Hecker',
      sort_code: '10-75-99',
      account_number: '9837 4831',
      address: {
        branch: 'Barclays Bank PLC',
        street: '1 Churchill Place',
        town: 'London',
        postcode: 'E14 5HP'
      },
      iban: 'DE27100777-770209299700',
      balance: '£483,293.62',
      transactions: [
        {
          date: '2019-04-30',
          name: 'Smith Plumbers Ltd',
          sum: '-£200',
          balance: '£483,293.62'
        },
        {
          date: '2019-04-30',
          name: 'J Jones Rent',
          sum: '+£1,200',
          balance: '£483,293.62'
        },
        {
          date: '2019-04-30',
          name: 'J Jones Rent',
          sum: '+£1,200',
          balance: '£483,293.62'
        },
        {
          date: '2019-04-13',
          name: 'Smith Plumbers Ltd',
          sum: '-£200',
          balance: '£483,293.62'
        },
        {
          date: '2019-04-13',
          name: 'J Jones Rent',
          sum: '+£1,200',
          balance: '£483,293.62'
        }
      ]
    }
  }
];

export const companies = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
