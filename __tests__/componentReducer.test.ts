import reducer from '../app/src/reducers/componentReducer';
import { State, Action, Component, ChildElement } from '../app/src/interfaces/InterfacesNew';

import initialState from '../app/src/context/initialState';

const path = require('path');
const Application = require('spectron').Application;
const baseDir = path.join(__dirname, '..');
const electronPath = path.join(baseDir, 'node_modules', '.bin', 'electron');

const app = new Application({
  path: electronPath,
  args: ['../app/electron/main.js']
})
// const testComponent: Component = {
//   id: 2,
//   name: "Test",
//   nextChildId: 1,
//   style: {},
//   code: '',
//   children: []
// }

describe('Testing componentReducer functionality', () => {
  let state: State = initialState;

  beforeAll(() => {
    return app.start();
  })

  afterAll(() => {
    if (app && app.isRunning()) {
      return app.stop();
    }
  })

  // TEST 'ADD COMPONENT'
  describe('ADD COMPONENT reducer', () => {
    it('should add new reuseable component to state', () => {
      const action = {
        type: 'ADD COMPONENT',
        payload: {
          componentName: "TestRegular",
          root: false
        }
      }
      state = reducer(state, action);
      // expect state.components array to have length 2
      const length = state.components.length;
      expect(length).toEqual(2);
      // expect new component name to match name of last elem in state.components array
      expect(state.components[length - 1].name).toEqual(action.payload.componentName);
    })
  })

  // TEST 'ADD CHILD'
  describe('ADD CHILD reducer', () => {
    it('should add child component to top-level component', () => {
      const action = {
        type: 'ADD CHILD',
        payload: {
          type: 'Component',
          typeId: 2,
          childId: null
        }
      }
      state.canvasFocus = { componentId: 1, childId: null };
      console.log(state);
      const newState = reducer(state, action);
      const newParent = newState.components[0];
      // expect newParent's children array to have length 1
      expect(newParent.children.length).toEqual(1);
      // expect child to have type 'Component' and name 'TestRegular'
      expect(newParent.children[0].type).toEqual('Component');
      expect(newParent.children[0].name).toEqual('TestRegular');
    })
  })
  // TEST 'CHANGE FOCUS'

  // TEST 'UPDATE CSS'

  // TEST 'SET INITIAL STATE'

})