import Immutable from 'immutable';

const defaultState = new Immutable.List();

export default function fotReducer(state = defaultState, action) {
  switch(action.type) {
    case 'GET_MENU':
      console.log('GET_MENU');
      console.log(action.res.data);
      return state.set(action.res.data.menu);
    default:
      return state;
  }
}