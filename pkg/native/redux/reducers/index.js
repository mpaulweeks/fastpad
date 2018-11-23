import { combineReducers } from 'redux';
import editor from './editor';
import thinking from './thinking';

export default combineReducers({
  editor,
  thinking,
});
