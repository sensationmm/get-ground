import DocumentsPrompt from './index';
import { navigate } from 'gatsby';

import { setup, findByTestAttr } from 'src/test-utils/test-utils';
import Button from 'src/components/_buttons/Button/Button';

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}));

describe('DocumentsPrompt', () => {
  let wrapper;
  const defaultProps = {
    t: jest.fn().mockImplementation((id) => id )
  };

  beforeEach(() => {
    wrapper = setup(DocumentsPrompt, defaultProps);
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-documents-prompt');
    expect(component.length).toBe(1);
  });

  test('button', () => {
    const button = wrapper.find(Button);
    button.simulate('click');

    expect(navigate).toHaveBeenCalledWith('/dashboard');
  });

  test('translations', () => {
    expect(wrapper.find('h2').text()).toBe('myDocuments.prompt.heading');
    expect(wrapper.find('p').at(0).text()).toBe('myDocuments.prompt.text');
    expect(wrapper.find('p').at(1).text()).toBe('myDocuments.prompt.text2');
    expect(wrapper.find(Button).dive().text()).toBe('myDocuments.prompt.cta');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
