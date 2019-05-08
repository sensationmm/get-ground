import { setupRTL } from 'src/test-utils/test-utils'

import ButtonUpload from './ButtonUpload'

describe('<ContactUs />', () => {
  it.skip('renders and has contactUs text', () => {
    const props = {
      path: '/contact-us',
      label: 'contactUs',
      location: {
        pathname: '/test-url',
        replace: jest.fn(),
      }
    }
    const component = setupRTL(ButtonUpload, {...props}, 'component-button-link')
    expect(component).toHaveTextContent('contactUs')
  })
})
