import { combineReducers } from 'redux';
import editor from './editor';
import listNotes from './listNotes';

export default combineReducers({
  editor,
  listNotes,
});
