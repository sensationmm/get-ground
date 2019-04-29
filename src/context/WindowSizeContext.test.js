import { render, fireEvent } from 'react-testing-library'
import React from 'react'

import WindowSizeContext from './WindowSizeContext'

describe('WindowSizeContext', () => {
  beforeEach(() => {
    window.innerHeight = 100;
    window.innerHeight = 100;
  })
  test('WindowSizeContext.Consumer shows width', () => {
    const value = {
      width: 100,
      height: 101,
      setResize: jest.fn(),
      breakpoint: 'mobile'
    }
    const tree = (
      <WindowSizeContext.Provider value={value}>
        <WindowSizeContext.Consumer>
          {value => <span>Width: {value.width}</span>}
        </WindowSizeContext.Consumer>
      </WindowSizeContext.Provider>
    )
    const { getByText } = render(tree)
    expect(getByText(/^Width:/).textContent).toBe('Width: 100')
  })

  test('WindowSizeContext.Consumer shows height', () => {
    const value = {
      width: 100,
      height: 101,
      setResize: jest.fn(),
      breakpoint: 'mobile'
    }
    const tree = (
      <WindowSizeContext.Provider value={value}>
        <WindowSizeContext.Consumer>
          {value => <span>Height: {value.height}</span>}
        </WindowSizeContext.Consumer>
      </WindowSizeContext.Provider>
    )
    const { getByText } = render(tree)
    expect(getByText(/^Height:/).textContent).toBe('Height: 101')
  })

  test('WindowSizeContext.Consumer shows breakpoint and calls setResize with the right args ', async () => {
    const value = {
      width: 100,
      height: 101,
      setResize: jest.fn(),
      breakpoint: 'mobile'
    }
    const tree = (
      <WindowSizeContext.Provider value={value}>
        <WindowSizeContext.Consumer>
          {value =>
          (<div>
            <div data-testid="test-resize" onClick={ () => value.setResize({width: 80, height: 100})}></div>
            <span>Breakpoint: {value.breakpoint}</span>
          </div>)
        }
        </WindowSizeContext.Consumer>
      </WindowSizeContext.Provider>
    )
    const { getByTestId, getByText} = render(tree)
    const wrapper = getByTestId('test-resize');
    fireEvent.click(wrapper,  new MouseEvent('click'));
    expect(getByText(/^Breakpoint:/).textContent).toBe('Breakpoint: mobile')
    expect(value.setResize).toHaveBeenCalledWith({width: 80, height: 100});
  })
})
