import React from 'react'
import { shallow } from 'enzyme'
import Pricing from './pricing'
import ContactUs from 'src/components/ContactUs/ContactUs'
import ImageFull from 'src/components/ImageFull/ImageFull'

describe('Pricing', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Pricing />)
  })

  test('pricing image', () => {
    expect(wrapper.find('[data-test="pricing-img"]').type()).toEqual(ImageFull)
  })

  test('title', () => {
    expect(wrapper.find('.pricing-title').text()).toEqual('pricing.title')
  })

  test('property title', () => {
    expect(wrapper.find('.pricing-property-title').text()).toEqual('pricing.property.title')
  })

  test('property monthly price', () => {
    expect(wrapper.find('[data-test="property-monthly-price"]').text()).toEqual('pricing.property.monthly.price')
  })

  test('property monthly vat', () => {
    expect(wrapper.find('[data-test="property-monthly-vat"]').text()).toEqual('pricing.vat')
  })

  test('property monthly caption', () => {
    expect(wrapper.find('.pricing-property-monthly-caption').text()).toEqual('pricing.property.monthly.caption')
  })

  test('property annual price', () => {
    expect(wrapper.find('[data-test="property-annual-price"]').text()).toEqual('pricing.property.annual.price')
  })

  test('property annual caption', () => {
    expect(wrapper.find('[data-test="property-annual-caption"]').text()).toEqual('pricing.property.annual.caption')
  })

  test('property annual caption', () => {
    expect(wrapper.find('[data-test="property-annual-caption-small"]').text()).toEqual('pricing.property.annual.smallCaption')
  })

  test('services title', () => {
    expect(wrapper.find('.pricing-services-title').text()).toEqual('pricing.services.title')
  })

  test('services first content', () => {
    expect(wrapper.find('[data-test="services-content-first"]').text()).toEqual('pricing.services.firstContent')
  })

  test('services secondary content', () => {
    expect(wrapper.find('[data-test="services-content-second"]').text()).toEqual('pricing.services.secondContent')
  })

  test('pricing contact us', () => {
    expect(wrapper.find('[data-test="pricing-contact-us"]').type()).toEqual(ContactUs)
  })
})
