import React from 'react'
import { setup, findByTestAttr } from 'src/test-utils/test-utils';

import { RawComponent as Advantages } from './advantages'

jest.mock('react-i18next', () => ({
  initReactI18next: jest.fn(),
  withTranslation: () => Component => props => <Component t={k => k} {...props} />,
  useTranslation: () => ([
    jest.fn(),
    {t: jest.fn().mockReturnValue({
      tax: {},
      company: {},
      table: {
        left: {
          info1: 'test'
        },
        right: {
          large: {
            feed1: {
              info1: 'test'
            },
            feed2: {
              info1: 'test'
            }
          }
        }
      }
    })},
  ])
}));

describe('<Advantages />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(Advantages, { isMobile:true, location: {} });
  })

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'container-advantages');
    expect(component.length).toBe(1);
  });
})
