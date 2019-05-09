import { setup, setupWithStore, findByTestAttr } from 'src/test-utils/test-utils';
import { scroller } from 'react-scroll';

import { RawComponent as ComplianceCheck } from './compliance-check';
import FormUtils from 'src/utils/form';

import Button from 'src/components/_buttons/Button/Button';
import QuizQ1 from './fragments/Compliance/QuizQ1';
import QuizQ2 from './fragments/Compliance/QuizQ2';
import QuizQ3 from './fragments/Compliance/QuizQ3';
import QuizQ4 from './fragments/Compliance/QuizQ4';
import QuizQ5 from './fragments/Compliance/QuizQ5';

import ModalContent from 'src/components/Modal/ModalContent';

describe('<ComplianceCheck />', () => {
  let wrapper;

  const tMock = jest.fn().mockReturnValue('str');
  const navigateMock = jest.fn();
  const showLoaderMock = jest.fn();
  const hideLoaderMock = jest.fn();
  const hideModalMock = jest.fn();
  const showModalMock = jest.fn();
  const updateValueMock = jest.spyOn(FormUtils, 'updateValue');
  const scrollerMock = jest.spyOn(scroller, 'scrollTo').mockReturnValue(() => {});
  const defaultProps = {
    t: tMock,
    navigate: navigateMock,
    showLoader: showLoaderMock,
    hideLoader: hideLoaderMock,
    hideModal: hideModalMock,
    showModal: showModalMock
  }
  const quizResultMock = {
    tax_bracket: 'personal',
    large_enterprise: ['option','option2'],
    investment_confirmation: true,
    self_certification: 'restricted',
    restricted_quiz: ['propertyvalues', 'investmentreturns'],
    large_enterprise_done: true,
    restricted_quiz_done: true
  };

  beforeEach(() => {
    wrapper = setup(ComplianceCheck, defaultProps, { values: quizResultMock, certificationComplete: true });
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'container-compliance-check');
    expect(component.length).toBe(1);
  });

  describe('checkResponses()', () => {
    describe('fail quiz', () => {
      test('missing property values', () => {
        wrapper = setup(ComplianceCheck, defaultProps, { values: {
          ...quizResultMock,
          restricted_quiz: ['propertyvalues']
        }});
        wrapper.instance().checkResponses(true);
        expect(wrapper.state('errors')).toEqual({ form: 'str' });
      });

      test('missing investmentreturns', () => {
        wrapper = setup(ComplianceCheck, defaultProps, { values: {
          ...quizResultMock,
          restricted_quiz: ['investmentreturns']
        }});
        wrapper.instance().checkResponses(true);
        expect(wrapper.state('errors')).toEqual({ form: 'str' });
      });

      test('fails quiz with too many answer', () => {
        wrapper = setup(ComplianceCheck, defaultProps, { values: {
          ...quizResultMock,
          restricted_quiz: ['propertyvalues', 'investmentreturns', 'putallmoney']
        }});
        wrapper.instance().checkResponses(true);
        expect(wrapper.state('errors')).toEqual({ form: 'str' });
      });
    });

    test('pass quiz', () => {
      wrapper = setupWithStore(ComplianceCheck, defaultProps, { values: {
        ...quizResultMock
      }});
      
      return wrapper.instance().checkResponses().then(() => {
        expect(showLoaderMock).toHaveBeenCalledTimes(1);
        expect(hideLoaderMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith('payment');
      });
    });
  });

  describe('goToStep()', () => {
    test('executes', () => {
      wrapper.instance().goToStep('q1');
      expect(scrollerMock).toHaveBeenCalledWith('q1', expect.any(Object));
    });
  });

  describe('fragment function props', () => {
    test('QuizQ1', () => {
      wrapper.find(QuizQ1).props().onChange('str');
      expect(updateValueMock).toHaveBeenCalledWith(expect.any(Object), 'tax_bracket', 'str');
    });

    test('QuizQ2', () => {
      wrapper.find(QuizQ2).props().onChange(['none','str1','str2']);
      expect(updateValueMock).toHaveBeenLastCalledWith(expect.any(Object), 'large_enterprise', ['str1','str2']);
      wrapper.find(QuizQ2).props().onChange(['str1','str2']);
      expect(updateValueMock).toHaveBeenLastCalledWith(expect.any(Object), 'large_enterprise', ['str1','str2']);
      wrapper.find(QuizQ2).props().onClickNone();
      expect(updateValueMock).toHaveBeenCalledWith(expect.any(Object), 'large_enterprise', ['none']);
      wrapper.find(QuizQ2).props().onClickNext();
      expect(updateValueMock).toHaveBeenCalledWith(expect.any(Object), 'large_enterprise_done', true);
      wrapper.find(QuizQ2).props().onDeselectAll();
      expect(updateValueMock).toHaveBeenCalledWith(expect.any(Object), 'large_enterprise_done', false);
    });

    test('QuizQ3', () => {
      wrapper.find(QuizQ3).props().onClick();
      expect(updateValueMock).toHaveBeenCalledWith(expect.any(Object), 'investment_confirmation', true);
    });

    test('QuizQ4', () => {
      wrapper.find(QuizQ4).props().onChange('str');
      expect(updateValueMock).toHaveBeenCalledWith(expect.any(Object), 'self_certification', 'str');
    });

    test('QuizQ4 - onChange calls `initModal`', () => {
      wrapper.instance().initModal = jest.fn();
      wrapper.find(QuizQ4).props().onChange('highnetworth');

      expect(updateValueMock).toHaveBeenCalledWith(expect.any(Object), 'self_certification', 'highnetworth');
      expect(wrapper.instance().initModal).toHaveBeenCalledWith('highnetworth');
    })

    test('QuizQ5', () => {
      wrapper.find(QuizQ5).props().onChange(['str1','str2']);
      expect(updateValueMock).toHaveBeenCalledWith(expect.any(Object), 'restricted_quiz', ['str1','str2']);
      wrapper.find(QuizQ5).props().onDeselectAll();
      expect(updateValueMock).toHaveBeenCalledWith(expect.any(Object), 'restricted_quiz_done', false);
    });

    test('Button', () => {
      wrapper.instance().checkResponses = jest.fn();
      wrapper.find(Button).props().onClick();
      expect(wrapper.instance().checkResponses).toHaveBeenCalledWith(true);
    });
  });

  describe('initModal()', () => {
    test('executes and calls `getModalContent` with a value of `highnetworth`', () => {
      wrapper.instance().getModalContent = jest.fn();
      wrapper.instance().initModal('highnetworth');

      expect(wrapper.instance().getModalContent).toHaveBeenCalledWith('highnetworth');
    });

    test('executes and calls `getModalContent` with a value of `selfcertified`', () => {
      wrapper.instance().getModalContent = jest.fn();
      wrapper.instance().initModal('selfcertified');

      expect(wrapper.instance().getModalContent).toHaveBeenCalledWith('selfcertified');
    });

    test('executes and calls `showModal with a value of highnetworth`', () => {
      wrapper = setup(ComplianceCheck, defaultProps, { values: quizResultMock, highNetWorthMarkdown: 'Dummy' });
      wrapper.instance().initModal('highnetworth');

      expect(showModalMock).toHaveBeenCalledTimes(1);
      expect(wrapper.state().modalMarkdown).toEqual('Dummy');
    });

    test('executes and calls `showModal with a value of selfcertified`', () => {
      wrapper = setup(ComplianceCheck, defaultProps, { values: quizResultMock, selfCertifiedMarkdown: 'Dummy' });
      wrapper.instance().initModal('selfcertified');

      expect(showModalMock).toHaveBeenCalledTimes(1);
      expect(wrapper.state().modalMarkdown).toEqual('Dummy');
    });
  });

  describe('closeModal()', () => {
    test('executes and calls `hideModal`', () => {
      wrapper.instance().closeModal();

      expect(wrapper.state().certificationComplete).toEqual(false);
      expect(hideModalMock).toHaveBeenCalledTimes(1);
    });

    test('executes and calls `hideModal`, `goTostep` & sets state', () => {
      wrapper = setup(ComplianceCheck, defaultProps, { values: quizResultMock, modalCheckBoxChecked: true });
      wrapper.instance().goToStep = jest.fn();
      wrapper.instance().closeModal();

      expect(wrapper.state().certificationComplete).toEqual(true);
      expect(hideModalMock).toHaveBeenCalledTimes(1);
      expect(wrapper.instance().goToStep).toHaveBeenCalledWith('q5');
    });
  });

  describe('modal Checkbox', () => {
    test('sets state for whether the modal checkbox is checked or not', () => {
      wrapper.find(ModalContent).props().handleCheckboxChange();
      expect(wrapper.state().modalCheckBoxChecked).toEqual(true);
    });
  });

  afterEach(() => {
    navigateMock.mockClear();
    showLoaderMock.mockClear();
    hideLoaderMock.mockClear();
    hideModalMock.mockClear();
    showModalMock.mockClear();
  });
});
