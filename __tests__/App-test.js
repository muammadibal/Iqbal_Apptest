import 'react-native';
import React from 'react';
import App from '../src/App';
import renderer, { create } from 'react-test-renderer';
import Button from '../src/components/button';
import Home from '../src/pages/home';

const listsTree = create(<Home />)

it('renders lists correctly', () => {
  expect(listsTree).toMatchSnapshot()
});

// describe('Button', () => {
//   it('should render without issues', () => {
//     const mockFn = jest.fn(() => result)
//     expect(component).toBe(1);
//     expect(toJson(component)).toMatchSnapshot();
//   })
// })