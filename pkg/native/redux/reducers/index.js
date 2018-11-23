import { combineReducers } from 'redux';
import editor from './editor';
import notes from './notes';
import thinking from './thinking';

export default combineReducers({
  editor,
  notes,
  thinking,
});
