//import {Helper} from '../../Api';
import request from 'axios';

export function createFot(text) {
  return {
    type: 'CREATE_FOT',
    text,
    date: Date.now()
  }
}

export function editFot(id, text) {
  return {
    type: 'EDIT_FOT',
    id,
    text,
    date: Date.now()
  };
}

export function deleteFot(id) {
  return {
    type: 'DELETE_FOT',
    id
  };
}

export function getMenu() {
    return {
	type: 'GET_MENU',
	promise: request.get('/menu')
    }
}