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
      idCheck: {
        passport: {
          img: '',
          retake: false
        },
        address: {
          img: '',
          retake: false
        },
        selfie: {
          img: '',
          retake: false
        }
      },
      setRetake: jest.fn(),
      retakePicture: jest.fn(),
      section: 'passport',
      initialImg: '/img',
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
    expect(wrapper.find('p').length).toEqual(2)
    expect(props.t).toHaveBeenCalledWith('onBoarding.idCheck.passport.title')
    expect(props.t).toHaveBeenCalledWith('onBoarding.idCheck.passport.content')
    expect(wrapper.find('img').length).toEqual(1)
    expect(wrapper.find('[data-test="camera"]').length).toEqual(0)
    expect(wrapper.find('[data-test="dropzone"]').length).toEqual(1)
  })

  it('start camera', () => {
    wrapper = shallow(<AddProof {...props} />);

    expect(props.t).not.toHaveBeenCalledWith('onBoarding.idCheck.image.capture')

    wrapper.find('[data-test="initial-img"]').simulate('click');
    expect(wrapper.state().takePicture).toEqual(true)
    expect(wrapper.length).toEqual(1)
    expect(wrapper.find('[data-test="intro-box"]').length).toEqual(1)
    expect(wrapper.find('.add-proof-overlay').length).toEqual(1)
    expect(wrapper.find('.add-proof-loading').length).toEqual(1)
    expect(wrapper.find('.add-proof-content').length).toEqual(1)
    expect(props.t).toHaveBeenCalledWith('onBoarding.idCheck.passport.content')
    expect(wrapper.find('[data-test="camera"]').length).toEqual(1)
    expect(wrapper.find('[data-test="dropzone"]').length).toEqual(1)
  })

  it('yes im happy', () => {
    const customProps = {
      ...props,
      idCheck: {
        passport: {
          img: 'test-image',
          retake: true
        },
        address: {
          img: '',
          retake: false
        },
        selfie: {
          img: '',
          retake: false
        }
      },
      active: 'passport'
    }

    wrapper = shallow(<AddProof {...customProps} />);

    expect(props.t).not.toHaveBeenCalledWith('onBoarding.idCheck.image.capture')

    wrapper.setState({
      takePicture: true
    });

    expect(wrapper.length).toEqual(1)
    expect(wrapper.find('[data-test="intro-box"]').length).toEqual(1)
    expect(wrapper.find('[data-test="camera"]').length).toEqual(0)
    expect(wrapper.find('[data-test="happy-button"]').length).toEqual(1)
    expect(wrapper.find('[data-test="retake-button"]').length).toEqual(1)
    expect(props.t).toHaveBeenCalledWith('onBoarding.idCheck.passport.retakeImageContent')
    expect(wrapper.find('[data-test="confirm-img"]').props().src).toEqual('test-image')
    wrapper.find('[data-test="happy-button"]').simulate('click')
    expect(wrapper.state().takePicture).toEqual(false)
  })

  it('retake', () => {

    const customProps = {
      ...props,
      idCheck: {
        passport: {
          img: 'test-image',
          retake: true
        },
        address: {
          img: '',
          retake: false
        },
        selfie: {
          img: '',
          retake: false
        }
      },
      active: 'passport'
    }

    wrapper = shallow(<AddProof {...customProps} />);

    expect(props.t).not.toHaveBeenCalledWith('onBoarding.idCheck.image.capture')

    wrapper.setState({
      takePicture: true
    });

    expect(wrapper.length).toEqual(1)
    expect(wrapper.find('[data-test="intro-box"]').length).toEqual(1)
    expect(wrapper.find('[data-test="camera"]').length).toEqual(0)
    expect(wrapper.find('[data-test="happy-button"]').length).toEqual(1)
    expect(wrapper.find('[data-test="retake-button"]').length).toEqual(1)
    expect(props.t).toHaveBeenCalledWith('onBoarding.idCheck.passport.retakeImageContent')
    wrapper.find('[data-test="retake-button"]').simulate('click')
    expect(props.setRetake).toHaveBeenCalledWith('passport', true)
    expect(props.setImg).toHaveBeenCalledWith('passport', null)
    expect(wrapper.state().takePicture).toEqual(true)
    wrapper.setProps({
      idCheck: {
        passport: {
          img: '',
          retake: true
        },
      },
    })
    expect(wrapper.find('[data-test="camera"]').length).toEqual(1)
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

  it('changes content when passed different section prop', () => {
    const customProps = {
      ...props,
      section: 'address'
    }

    wrapper = shallow(<AddProof {...customProps} />);

    expect(wrapper.find('[data-test="intro-box"]').length).toEqual(1)
    expect(wrapper.find('p').length).toEqual(2)
    expect(props.t).toHaveBeenCalledWith('onBoarding.idCheck.address.title')
    expect(props.t).toHaveBeenCalledWith('onBoarding.idCheck.address.content')
    expect(props.t).toHaveBeenCalledWith('onBoarding.idCheck.address.name')
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
      active: 'passport',
      idCheck: {
        passport: {
          img: 'test-image',
          retake: false
        },
      },
    }

    wrapper = shallow(<AddProof {...customProps} />);

    wrapper.setState({
      takePicture: true
    });

    expect(wrapper.find('[data-test="intro-box"]').length).toEqual(1)
    expect(props.resetActive).toHaveBeenCalled()
    expect(wrapper.find('[data-test="add-proof-final-img"]').length).toEqual(1)
    wrapper.find('[data-test="add-proof-final-img"]').simulate('click')
    expect(props.setActive).toHaveBeenCalled()
    expect(props.setImg).toHaveBeenCalled()
  })

  it('does not show upload link if section is selfie', () => {
    const customProps = {
      ...props,
      section: 'selfie',
      active: 'selfie'
    }

    wrapper = shallow(<AddProof {...customProps} />);

    expect(wrapper.find('.add-proof-upload-file').length).toEqual(0)
  })
})
