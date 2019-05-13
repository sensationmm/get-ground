import React from 'react'
import { shallow } from 'enzyme'

import { AddProof } from './AddProof'

/**
 * FileReader
 * mock FileReader
 *
 * @author Ravin Patel
 * @return {Class} FileReader
 */
class MockFileReader {
  onerror() {}
  onload() {}
  readAsDataURL() {
    this.result = 'result';
    this.onload = jest.fn();
  }
}

describe('<AddProof />', () => {
  let wrapper;
  let props;
  const originalFileReader = FileReader;

  beforeEach(() => {
    props = {
      section: 'passport',
      initialImg: '/img',
      isSelfie: false,
      setImg: jest.fn(),
      t: jest.fn(),
      setActive: jest.fn(),
      resetActive: jest.fn(),
      active: '',
      isMobile: false,
      i18n: {
        t: jest.fn().mockReturnValue('mock-string'),
      }
    }
    window.FileReader = MockFileReader;
  })

  afterEach(() => {
    window.FileReader = originalFileReader;
  })

  it('Initial Landing', () => {
    wrapper = shallow(<AddProof {...props} />);

    expect(wrapper.length).toEqual(1)
    expect(wrapper.find('[data-test="intro-box"]').length).toEqual(1)
    expect(wrapper.find('p').length).toEqual(1)
    expect(props.t).toHaveBeenCalledWith('onBoarding.idCheck.passport.title')
    expect(props.t).toHaveBeenCalledWith('onBoarding.idCheck.passport.content')
    expect(wrapper.find('img').length).toEqual(1)
    expect(wrapper.find('[data-test="webcam"]').length).toEqual(0)
    expect(wrapper.find('[data-test="dropzone"]').length).toEqual(1)
  })

  it('start camera', () => {
    wrapper = shallow(<AddProof {...props} />);

    expect(props.t).not.toHaveBeenCalledWith('onBoarding.idCheck.image.capture')

    wrapper.find('[data-test="initial-img"]').simulate('click');
    expect(wrapper.state().takePicture).toEqual(true)
    expect(wrapper.length).toEqual(1)
    expect(wrapper.find('[data-test="intro-box"]').length).toEqual(1)
    expect(wrapper.find('p').length).toEqual(1)
    expect(props.t).toHaveBeenCalledWith('onBoarding.idCheck.passport.content')
    expect(wrapper.find('[data-test="webcam"]').length).toEqual(1)
    expect(wrapper.find('[data-test="capture-button"]').length).toEqual(1)
    expect(props.t).toHaveBeenCalledWith('onBoarding.idCheck.image.capture')
    expect(wrapper.find('[data-test="dropzone"]').length).toEqual(1)
  })

  it('take picture', () => {

    wrapper = shallow(<AddProof {...props} />);

    expect(props.t).not.toHaveBeenCalledWith('onBoarding.idCheck.image.capture')

    wrapper.setState({
      takePicture: true,
      webcam: {
        getScreenshot: jest.fn().mockReturnValue('base-img')
      }
    });

    expect(wrapper.length).toEqual(1)
    expect(wrapper.find('[data-test="intro-box"]').length).toEqual(1)
    expect(wrapper.find('p').length).toEqual(1)
    expect(wrapper.find('[data-test="webcam"]').length).toEqual(1)
    expect(wrapper.find('[data-test="capture-button"]').length).toEqual(1)
    expect(props.t).toHaveBeenCalledWith('onBoarding.idCheck.image.capture')
    wrapper.find('[data-test="capture-button"]').simulate('click')
    expect(wrapper.state().webcam.getScreenshot).toHaveBeenCalledWith()
    expect(wrapper.state().retakePicture).toEqual(true)
    expect(wrapper.state().imageSrc).toEqual('base-img')
  })

  it('yes im happy', () => {

    wrapper = shallow(<AddProof {...props} />);

    expect(props.t).not.toHaveBeenCalledWith('onBoarding.idCheck.image.capture')

    wrapper.setState({
      takePicture: true,
      retakePicture: true,
      imageSrc: 'base-img',
      webcam: {
        getScreenshot: jest.fn().mockReturnValue('base-img')
      }
    });

    expect(wrapper.length).toEqual(1)
    expect(wrapper.find('[data-test="intro-box"]').length).toEqual(1)
    expect(wrapper.find('p').length).toEqual(1)
    expect(wrapper.find('[data-test="webcam"]').length).toEqual(0)
    expect(wrapper.find('[data-test="happy-button"]').length).toEqual(1)
    expect(wrapper.find('[data-test="retake-button"]').length).toEqual(1)
    expect(props.t).toHaveBeenCalledWith('onBoarding.idCheck.passport.retakeImageContent')
    wrapper.find('[data-test="happy-button"]').simulate('click')
    expect(wrapper.state().retakePicture).toEqual(false)
    expect(wrapper.find('img').props().src).toEqual('base-img')
  })

  it('retake', () => {

    wrapper = shallow(<AddProof {...props} />);

    expect(props.t).not.toHaveBeenCalledWith('onBoarding.idCheck.image.capture')

    wrapper.setState({
      takePicture: true,
      retakePicture: true,
      imageSrc: 'base-img',
      webcam: {
        getScreenshot: jest.fn().mockReturnValue('base-img')
      }
    });

    expect(wrapper.length).toEqual(1)
    expect(wrapper.find('[data-test="intro-box"]').length).toEqual(1)
    expect(wrapper.find('p').length).toEqual(1)
    expect(wrapper.find('[data-test="webcam"]').length).toEqual(0)
    expect(wrapper.find('[data-test="happy-button"]').length).toEqual(1)
    expect(wrapper.find('[data-test="retake-button"]').length).toEqual(1)
    expect(props.t).toHaveBeenCalledWith('onBoarding.idCheck.passport.retakeImageContent')
    wrapper.find('[data-test="retake-button"]').simulate('click')
    expect(wrapper.state().retakePicture).toEqual(true)
    expect(wrapper.find('[data-test="webcam"]').length).toEqual(1)
    expect(wrapper.find('[data-test="capture-button"]').length).toEqual(1)
  })

  it('dropzone', () => {

    wrapper = shallow(<AddProof {...props} />);
    const dropzone = wrapper.find('[data-test="dropzone"]')
    expect(dropzone.length).toEqual(1)

    dropzone.props().onDrop([
      {mockFile: 'mock-uploaded-file'}
    ])

    expect(wrapper.state().uploadedFile).toEqual({ mockFile: 'mock-uploaded-file' })
  })

  it('change video constraints when section is selfie', () => {
    const customProps = {
      ...props,
      section: 'selfie'
    }

    wrapper = shallow(<AddProof {...customProps} />);

    wrapper.setState({
      takePicture: true,
      webcam: {
        getScreenshot: jest.fn().mockReturnValue('base-img')
      }
    });

    expect(wrapper.find('[data-test="webcam"]').length).toEqual(1)
    expect(wrapper.find('[data-test="webcam"]').props().videoConstraints).toEqual({
      width: 1280,
      height: 720,
      facingMode: 'user'
    })
  })

  it('changes content when passed different section prop', () => {
    const customProps = {
      ...props,
      section: 'address'
    }

    wrapper = shallow(<AddProof {...customProps} />);

    expect(wrapper.find('[data-test="intro-box"]').length).toEqual(1)
    expect(wrapper.find('p').length).toEqual(1)
    expect(props.t).toHaveBeenCalledWith('onBoarding.idCheck.address.title')
    expect(props.t).toHaveBeenCalledWith('onBoarding.idCheck.address.content')
  })

  it('adds disable classname to section when prop active is equal to a different section', () => {
    const customProps = {
      ...props,
      active: 'address',
    }

    wrapper = shallow(<AddProof {...customProps} />);

    expect(wrapper.find('[data-test="component-add-proof"]').length).toEqual(1)
    expect(wrapper.find('[data-test="component-add-proof"]').hasClass('disabled')).toEqual(true)
  })

  it('does not fire actions to setImg and resetActive when prop active !== section', () => {
    const customProps = {
      ...props,
      active: 'address',
    }

    wrapper = shallow(<AddProof {...customProps} />);

    expect(props.resetActive).not.toHaveBeenCalled()
    expect(props.setImg).not.toHaveBeenCalled()
  })

  it('on final img, fire actions to setImg and resetActive when prop active === section', () => {
    const customProps = {
      ...props,
      active: 'passport'
    }

    wrapper = shallow(<AddProof {...customProps} />);

    wrapper.setState({
      takePicture: true,
      retakePicture: false,
      imageSrc: 'base-img',
      webcam: {
        getScreenshot: jest.fn().mockReturnValue('base-img')
      }
    });

    expect(wrapper.find('[data-test="intro-box"]').length).toEqual(1)
    expect(wrapper.find('img').props().src).toEqual('base-img')
    expect(props.resetActive).toHaveBeenCalled()
    expect(props.setImg).toHaveBeenCalledWith('passport', 'base-img')
  })
})
