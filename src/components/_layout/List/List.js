import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import './list.scss';
import { isArray } from 'util';

/**
* List
* Wrapper component to display a set of form elememts
* @param {element|array} children - any HTML/React components to display as the content
* @param {integer} numToShow - number of items to display before show all
*/
class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAll: false
    }
  }

  render() {
    const { showAll } = this.state;
    const { children, numToShow, t } = this.props;

    const numItems = isArray(children) ? children.flat().length : children.length;
    
    return (
      <div data-test="component-list" className="list">
        {
          isArray(children) && children.map((child, key) => {
            if(!child || (!showAll && key >= numToShow)) {
              return null;
            }

            if(isArray(child)) {
              return child.map((childItem, childKey) => {
                if(!showAll && (key + childKey) >= numToShow) {
                  return null;
                }

                return <div className="list-row" key={`list-row-${childKey}`}>{childItem}</div>;
              });
            }
            
            return <div className="list-row" key={`list-row-${key}`}>{child}</div>;
          })
        }

        {!isArray(children) && 
          <div className="list-row">{children}</div>
        }
            
        {!showAll && !!numToShow && numToShow < numItems - 1 &&
          <div className="show-all" onClick={() => this.setState({ showAll: true })}>{ t('showAll') }</div>
        }
      </div>
    );
  }
}

List.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.string
  ]).isRequired,
  numToShow: PropTypes.number,
  t: PropTypes.func
};

export const RawComponent = List;

export default withTranslation()(List);
