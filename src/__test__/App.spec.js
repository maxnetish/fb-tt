import React from 'react';
import App from '../App';
import renderer from 'react-test-renderer';
import { expect } from 'chai';

xtest('App snapshot', () => {
  const component = renderer.create(<App />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

/*
qTypeError: _this2.container.addEventListener is not a function

      at node_modules/react-sortable-hoc/dist/commonjs/SortableContainer/index.js:435:39
          at Array.forEach (<anonymous>)

 */
