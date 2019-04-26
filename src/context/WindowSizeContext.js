import React, { Component } from "react"

const WindowSizeContext = React.createContext()

class WindowSizeProvider extends Component {

  state = {
    width: window.innerWidth,
    height: window.innerHeight,
    breakpoint: window.innerWidth < 800 ? 'mobile' : 'desktop'
  }


  setResize = ({width, height}) => {
    this.setState({
      width,
      height,
      breakpoint: width < 800 ? 'mobile' : 'desktop'
    })
  }


  render() {
    const { children } = this.props
    const { width, height, breakpoint } = this.state

    return (
      <WindowSizeContext.Provider
        value={{
          width,
          height,
          setResize: this.setResize,
          breakpoint
        }}
      >
        {children}
      </WindowSizeContext.Provider>
    )
  }
}

export default WindowSizeContext

export { WindowSizeProvider }
