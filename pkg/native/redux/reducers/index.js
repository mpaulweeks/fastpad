import { combineReducers } from 'redux';
import editor from './editor';
import notes from './notes';

export default combineReducers({
  editor,
  notes,
});
