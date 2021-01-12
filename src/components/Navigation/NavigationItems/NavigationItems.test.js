import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems/>', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });
    
    it ( 'should render 2 navs if the user is not auth', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    } );

    it ( 'should render 3 navs if the user is auth', () => {
        wrapper.setProps({isAuth: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    } );

    it ( 'should render log out if the user is auth', () => {
        wrapper.setProps({isAuth: true})
        expect(wrapper.contains( <NavigationItem link="/logout"> Log out </NavigationItem> )).toEqual(true);
    } );
});