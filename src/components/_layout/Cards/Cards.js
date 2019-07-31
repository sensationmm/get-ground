import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next'

import Slider from 'src/components/Slider/Slider';

import './cards.scss';

/**
* Cards
* Displays an array of text content in staggered left/right alignment
* @param {object} props - props object
* @return {JSXElement} - Cards component
*/
const Cards = (props) => {
  const { heading, cardA, cardB, renderSlider } = props;
  const [t] = useTranslation()

  const card = (src) => {
    return (
      <div className="card">
        <div className="card-name">{ src.name }</div>

        <div className="card-price">
          <div className="card-price-unit">£</div>
          <div className="card-price-value">{ src.price }</div>
          <div className="card-price-per">{ t('advantages.fees.pricePer') }</div>
        </div>
        <div className="card-price-vat">{ t('advantages.fees.priceVat') }</div>

        <div className="card-explanation">{ src.explanation }</div>

        <div className="card-content">{ src.content && <div dangerouslySetInnerHTML={{ __html: src.content }} />}</div>

      </div>
    )
  }
  
  return (
    <div data-test="component-cards" className="cards">
      <h2>{ heading }</h2>

      {!renderSlider 
        ? <div className="cards-content">
          { card(cardA) }
          { card(cardB) }
        </div>
        : <Slider slides={[ card(cardA), card(cardB) ]} />
      }
    </div>
  );
}

Cards.propTypes = {
  heading: PropTypes.string,
  cardA: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.string,
    explanation: PropTypes.string,
    content: PropTypes.string
  }),
  cardB: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.string,
    explanation: PropTypes.string,
    content: PropTypes.string
  }),
  renderSlider: PropTypes.bool
};

Cards.defaultProps = {
  renderSlider: false
};

export default Cards;
