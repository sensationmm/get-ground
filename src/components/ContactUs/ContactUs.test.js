import { setupRTL } from '../../test-utils/test-utils'

import ContactUs from './ContactUs'

describe('<ContactUs />', () => {
  it('renders and has contactUs text', () => {
    const props = {
      location: {
        pathname: '/test-url',
        replace: jest.fn(),
      }
    }
    const component = setupRTL(ContactUs, {...props}, 'component-contact-us')
    expect(component).toHaveTextContent('contactUs')
  })
})
