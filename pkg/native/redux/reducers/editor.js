import {
  SET_EDITOR_NOTE,
  SET_EDITOR_FOCUS,
} from '../actions';

const initialState = {
  focused: false,
  note: {
    id: null,
    text: '',
  },
};
const editor = (state = initialState, action) => {
  switch (action.type) {
    case SET_EDITOR_NOTE:
      return {
        ...state,
        note: action.note,
      };
    case SET_EDITOR_FOCUS:
      return {
        ...state,
        focused: action.focused,
      };
    default:
      return state;
  }
}

export default editor;
