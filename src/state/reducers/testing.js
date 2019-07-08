export const initialState = {
  'activeCompany': 1,
  'companies': [
    {
      'id':1,
      'name': 'GG-123-456 Ltd',
      'property_address': {
        'address': {
          'premise': '1',
          'street': 'Some Street',
          'thoroughfare':null,
          'posttown': 'London',
          'postcode': 'AB1 2CD',
          'country_name': 'United Kingdom of Great Britain & Northern Ireland'
        },'is_confirmed':true
      },
      'shareholder_details':{
        'collection': [
          {
            first_name: 'John',
            last_name: 'Smith',
            is_director: true
          },
          {
            first_name: 'Angela',
            last_name: 'Smith',
            is_director: false
          },
          {
            first_name: 'Robert',
            last_name: 'Smith',
            is_director: false
          }
        ]
      },
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
  ]
};

export const testing = (state = initialState, action = {}) => {
  switch (action.type) {
    default:
      return state;
  }
};

