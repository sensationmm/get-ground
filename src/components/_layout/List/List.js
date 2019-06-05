import React from 'react';
import PropTypes from 'prop-types';

import './list.scss';
import { isArray } from 'util';

/**
* List
* Wrapper component to display a set of form elememts
*
* @param {element|array} children - any HTML/React components to display as the content
*/

const List = props => {
  const { children } = props;
  return (
    <div data-test="component-list" className="list">
      {
        isArray(children) && children.map((child, key) => {
          if(isArray(child)) {
            return child.map((childItem, childKey) => {
              return <div className="list-row" key={`list-row-${childKey}`}>{childItem}</div>;
            });
          }
          return <div className="list-row" key={`list-row-${key}`}>{child}</div>;
        })
      }

      {!isArray(children) && 
        <div className="list-row">{children}</div>
      }
    </div>
  );
};

List.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.string
  ]).isRequired
};

export default List;
