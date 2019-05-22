
import { RawComponent as MyDocuments, ModalService } from './index';
import { navigate } from 'gatsby';
import { setup, setupWithStore } from 'src/test-utils/test-utils';

jest.mock('src/assets/images/property.svg', () => '');

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}));

describe('process-tracker', () => {
  let wrapper;
  const mockDocuments = {
    document1: {
      title: 'Shareholders Agreement',
      imageAltText: 'Shareholders'
    },
    document2: {
      title: 'Company Articles of Association',
      imageAltText: 'Company Articles of Association'
    },
    document3: {
      title: 'Directors Loan Agreement',
      imageAltText: 'Directors Loan'
    },
    document4: {
      title: 'Consent to Act as a Director',
      imageAltText: 'Consent to Act as a Director'
    },
    document5: {
      title: 'Board Resolution to Exchange Contracts',
      imageAltText: 'Board Resolution to Exchange Contracts'
    }
  }
  const showModalMock = jest.fn();
  const hideModalMock = jest.fn();
  const showLoaderMock = jest.fn();
  const hideLoaderMock = jest.fn();
  ModalService.fetchModalContent = jest.fn('val').mockReturnValue(Promise.resolve({ data: { markdown_text: '<h1>HI</h1>' } }));
  const defaultProps = {
    t: jest.fn().mockReturnValue('test-string'),
    i18n: {
      t: jest.fn().mockReturnValue(mockDocuments),
    },
    hideModal: hideModalMock,
    showModal: showModalMock,
    showLoader: showLoaderMock,
    hideLoader: hideLoaderMock
  }

  global.URL = {
    createObjectURL: jest.fn()
  };

  beforeEach(() => {
    wrapper = setup(MyDocuments, defaultProps);
  })

  test('renders title', () => {
    expect(wrapper.find('h3').text()).toEqual('test-string');
  })

  test('renders ProcessSection', () => {
    expect(wrapper.find('ProcessSection')).toHaveLength(5);
  })

  test('renders Button', () => {
    expect(wrapper.find('Button')).toHaveLength(1);
  })

  describe('initmodal()', () => {

    test('executes and calls `getModalContent` with `shareholdersAgreementMarkdown` & `shareholders agreement`', () => {
      wrapper.instance().getModalContent = jest.fn();
      wrapper.instance().initModal('shareholdersAgreementMarkdown', 'shareholders agreement');

      expect(wrapper.instance().getModalContent).toHaveBeenCalledWith('shareholdersAgreementMarkdown', 'shareholders agreement');
    });

    test('executes and calls `showModal` and sets state', () => {
      wrapper = wrapper = setup(MyDocuments, defaultProps, {
        shareholdersAgreementMarkdown: 'some dummy markdown'
      });

      wrapper.instance().initModal('shareholdersAgreementMarkdown', 'shareholders agreement');

      expect(showModalMock).toHaveBeenCalledTimes(1);
      expect(wrapper.state().modalMarkdown).toEqual('some dummy markdown');
    });

  });

  test('getModalContent stores the markdown', async () => {
    const wrapper = setupWithStore(MyDocuments, defaultProps, { modalMarkdown: '', shareholdersAgreementMarkdown: ''});
    
    await wrapper.instance().getModalContent('shareholdersAgreementMarkdown', 'shareholders agreement');
    
    expect(showLoaderMock).toHaveBeenCalledTimes(1);
    expect(hideLoaderMock).toHaveBeenCalledTimes(1);
    expect(wrapper.state().shareholdersAgreementMarkdown).toEqual('<h1>HI</h1>');
    expect(wrapper.state().modalMarkdown).toEqual('<h1>HI</h1>');
  });

  test('closeModal() fires hideModal', () => {
    wrapper.instance().closeModal();
    expect(hideModalMock).toHaveBeenCalledTimes(1);
  });

  test('checkAllSigned navigates to confirmation if all docs are signed', () => {
    wrapper = wrapper = setup(MyDocuments, defaultProps, {
      shareholdersAgreementSigned: true,
      companyArticlesSigned: true,
      directorsLoanSigned: true,
      consentToActSigned: true,
      BoardResolutionSigned: true
    });
    

    wrapper.instance().checkAllSigned();

    expect(navigate).toHaveBeenCalledWith('/documents/confirmation');
  })

  test('getAllMarkdown fetches and stores the markdown', async () => {
    const wrapper = setupWithStore(MyDocuments, defaultProps, { 
      shareholdersAgreementMarkdown: '',
      companyArticlesMarkdown: '',
      directorsLoanMarkdown: '',
      consentToActMarkdown: '',
      BoardResolutionMarkdown: ''
    });

    wrapper.instance().downloadAllFiles = jest.fn();
    
    await wrapper.instance().getAllMarkdown();
    
    expect(wrapper.state().shareholdersAgreementMarkdown).toEqual('<h1>HI</h1>');
    expect(wrapper.state().companyArticlesMarkdown).toEqual('<h1>HI</h1>');
    expect(wrapper.state().directorsLoanMarkdown).toEqual('<h1>HI</h1>');
    expect(wrapper.state().consentToActMarkdown).toEqual('<h1>HI</h1>');
    expect(wrapper.state().BoardResolutionMarkdown).toEqual('<h1>HI</h1>');
    expect(wrapper.instance().downloadAllFiles).toHaveBeenCalled();
  });

  test('getAllMarkdown fires downloadAllFiles if markup is already stored', async () => {
    const wrapper = setupWithStore(MyDocuments, defaultProps, { 
      shareholdersAgreementMarkdown: '<h1>HI</h1>',
      companyArticlesMarkdown: '<h1>HI</h1>',
      directorsLoanMarkdown: '<h1>HI</h1>',
      consentToActMarkdown: '<h1>HI</h1>',
      BoardResolutionMarkdown: '<h1>HI</h1>'
    });

    wrapper.instance().downloadAllFiles = jest.fn();
    
    await wrapper.instance().getAllMarkdown();
    
    expect(wrapper.instance().downloadAllFiles).toHaveBeenCalled();
  });

  test('downloadAllFiles creates links for download', async () => {
    ModalService.markdownToPDF = jest.fn().mockReturnValue(Promise.resolve({ status: 201 }));
    const wrapperNew = setupWithStore(MyDocuments, defaultProps);
    
    await wrapperNew.instance().downloadAllFiles('<h1>HI</h1>');

    // cant test the length of the element because I think I need mount for document.getElementById('my-documents')
  });

})
