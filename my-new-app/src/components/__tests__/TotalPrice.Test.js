import React from 'react';
import { shallow } from 'enzyme';
import TotalPrice from '../TotalPrice';


const props = {
  income: 1000,
  expense: 2000
}

describe('test TotalPrice component', () => {
  it('component should render correct income and outcome numbers', () => {
    const wrapper  = shallow(<TotalPrice {...props}/>)
    expect(wrapper.find('.income').text()*1).toEqual(1000)
    expect(wrapper.find('.expense').text()*1).toEqual(2000)
  })
})




