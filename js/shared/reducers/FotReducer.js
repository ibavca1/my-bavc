import Immutable from 'immutable';

const defaultState = new Immutable.List();

export default function fotReducer(state = defaultState, action) {
  switch(action.type) {
    case 'CREATE_FOT':
      console.dir(action);
      return state.concat(action.text);
    case 'EDIT_FOT':
      return state.set(action.id, action.text);
    case 'DELETE_FOT':
      return state.delete(action.id);
    default:
      return state;
  }
}