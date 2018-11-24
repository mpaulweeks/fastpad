import {
  SET_EDITOR_NOTE,
  SET_EDITOR_FOCUS,
  CREATE_NOTE_BEGIN,
  CREATE_NOTE_SUCCESS,
  CREATE_NOTE_FAILURE,
  UPDATE_NOTE_BEGIN,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_FAILURE,
} from '../actions';

const initialState = {
  focused: false,
  note: {
    id: null,
    text: '',
  },
  saving: false,
  error: null,
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

    case CREATE_NOTE_BEGIN:
      return {
        ...state,
        saving: true,
        error: null,
      };
    case CREATE_NOTE_SUCCESS:
      return {
        ...state,
        saving: false,
        note: {
          ...action.payload.note,
          text: state.note.text,
        },
      };
    case CREATE_NOTE_FAILURE:
      return {
        ...state,
        saving: false,
        error: action.payload.error,
      };

    case UPDATE_NOTE_BEGIN:
      return {
        ...state,
        saving: true,
        error: null,
      };
    case UPDATE_NOTE_SUCCESS:
      return {
        ...state,
        saving: false,
        note: {
          ...action.payload.note,
          text: state.note.text,
        },
      };
    case UPDATE_NOTE_FAILURE:
      return {
        ...state,
        saving: false,
        error: action.payload.error,
      };


    default:
      return state;
  }
}

export default editor;
