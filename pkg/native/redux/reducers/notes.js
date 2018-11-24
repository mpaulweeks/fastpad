import {
  SET_EDITOR_NOTE,
  SET_EDITOR_FOCUS,
  CREATE_NOTE_BEGIN,
  CREATE_NOTE_SUCCESS,
  CREATE_NOTE_FAILURE,
  UPDATE_NOTE_BEGIN,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_FAILURE,
  FETCH_NOTES_BEGIN,
  FETCH_NOTES_SUCCESS,
  FETCH_NOTES_FAILURE,
  DELETE_NOTE_BEGIN,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAILURE,
} from '../actions';

const initialState = {
  editor: {
    focused: false,
    note: {
      id: null,
      text: '',
    },
    saving: false,
    error: null,
  },
  list: {
    notes: {},
    loading: false,
    error: null,
  },
};

function appendEditor(state, newState){
  return {
    ...state,
    editor: {
      ...state.editor,
      ...newState,
    },
  };
}
function appendList(state, newState){
  return {
    ...state,
    list: {
      ...state.list,
      ...newState,
    },
  };
}
function updateNotes(state){
  return appendList(state, {
    notes: {
      ...state.list.notes,
      [state.editor.note.id]: state.editor.note,
    },
  });
}
export default function notesReducer(state = initialState, action) {

  switch (action.type) {

    case SET_EDITOR_NOTE:
      return appendEditor(state, {
        note: action.note,
      });

    case SET_EDITOR_FOCUS:
      return appendEditor(state, {
        focused: action.focused,
      });

    case CREATE_NOTE_BEGIN:
    case UPDATE_NOTE_BEGIN:
      return updateNotes(appendEditor(state, {
        saving: true,
        error: null,
      }));
    case CREATE_NOTE_SUCCESS:
    case UPDATE_NOTE_SUCCESS:
      return updateNotes(appendEditor(state, {
        saving: false,
        note: {
          ...action.payload.note,
          text: state.editor.note.text,
        },
      }));
    case CREATE_NOTE_FAILURE:
    case UPDATE_NOTE_FAILURE:
      return appendEditor(state, {
        saving: false,
        error: action.payload.error,
      });


    case FETCH_NOTES_BEGIN:
    case DELETE_NOTE_BEGIN:
      return appendList(state, {
        loading: true,
        error: null,
      });

    case FETCH_NOTES_SUCCESS:
      return appendList(state, {
        loading: false,
        notes: action.payload.notes.reduce((obj, note) => {
          obj[note.id] = note;
          return obj;
        }, {}),
      });
    case DELETE_NOTE_SUCCESS:
      return appendList(state, {
        loading: false,
      });

    case FETCH_NOTES_FAILURE:
    case DELETE_NOTE_FAILURE:
      return appendList(state, {
        loading: false,
        error: action.payload.error,
      });

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
